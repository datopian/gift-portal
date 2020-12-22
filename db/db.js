import { Dataset } from "frictionless.js";
import fs from "fs";
import { join } from "path";
import toArray from "stream-to-array";
import repositories from "../config/config.json";
import { getRepositoriesQuery } from "./query";
import { GraphQLClient } from "graphql-request";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const GithubApiUrl = "https://api.github.com/graphql";

const client = new GraphQLClient(GithubApiUrl, {
  headers: { Authorization: `Bearer ${process.env.APP_GITHUB_KEY}` },
});

/**
 * Returns a list of data packages descriptors found in db directory
 * Descriptors are retrieved using frictionless.js.
 * @param {Array} directories an array of directories containing datapacka.json's
 * @returns {Array} List of data descriptors
 */
export const getCatalog = async (directories) => {
  let catalogs = [];
  let descCatalog = [];
  for (let i = 0; i < directories.length; i++) {
    let path = join(process.cwd(), "fixtures", directories[i]);
    let dataset = await Dataset.load(path);
    let file = await dataset.resources[0];
    await file.addSchema();
    let schema = file.descriptor.schema;
    let sample_stream = await file.rows({ size: file.size }); //TODO: Might be a bottleneck later
    let sample = await toArray(sample_stream);
    let catalog = {};
    catalog[dataset._descriptor.title] = dataset._descriptor;
    descCatalog.push(dataset._descriptor);
    catalog["schema"] = schema;
    catalog["sample"] = sample;
    catalogs.push(catalog);
  }
  return [catalogs, descCatalog];
};

/**
 * Returns a list of directory names found in fixtures folder
 */
export const getDirectories = () => {
  return new Promise((resolve, reject) => {
    const directoryPath = join(process.cwd(), "fixtures/");
    const dataFolderNames = [];

    fs.readdir(directoryPath, function (err, dataFolders) {
      if (err) {
        reject(err);
      }
      dataFolders.forEach(function (dataFolder) {
        dataFolderNames.push(dataFolder);
      });
      resolve(dataFolders);
    });
  });
};

export const loadDataFromGithub = async () => {
  return new Promise(async (resolve, reject) => {
    let repos = Object.values(repositories);
    let owner = process.env.ORGANISATION_REPO;
    let catalogs = {};
    let descCatalog = [];

    let repo_lenght = repos.length;

    for (let i = 0; i < repo_lenght; i++) {
      const data = await client.request(getRepositoriesQuery, {
        owner: `${owner}`,
        name: `${repos[i]}`,
      });
      //process result before returning
      let processed_repo = await processDataFromRepository(data);
      catalogs[repos[i]] = processed_repo;
      descCatalog.push(processed_repo);
      if (i == repo_lenght - 1) {
        // TODO:@STEVEN ADD catalog to local metastore
        resolve([catalogs, descCatalog]);
      }
    }
  });
};

const processDataFromRepository = async (repo) => {
  let datapackage;
  datapackage = repo.repository.object.entries[3]["object"]["text"];

  try {
    datapackage = JSON.parse(datapackage);
    datapackage.error = false;
  } catch (error) {
    datapackage = {
      sample: [],
      schema: [],
      title: "",
      description: "",
      resources: [{ schema: [] }],
      name: "",
      author: "",
      geo: "",
      error: true, //parsing error in datapackage.json. Use to display in homepage and dataset page
    };
  }

  //Before we can read a datapackage.json with frictionless so as to get a sample,
  // we have replace resource paths with generated URL. See Issue #22
  // let dataset = await Dataset.load(datapackage);
  // console.log("Dataset", dataset);

  let data = {};
  data["sample"] = datapackage["sample"] || [];
  data["schema"] = datapackage["resources"][0]["schema"] || [];
  data["title"] = datapackage["title"] || "";
  data["description"] =
    datapackage.description || repo.description || "No Description";
  data["resources"] = datapackage["resources"] || [];
  data["name"] = repo.repository["name"] || "";
  data["createdAt"] = dayjs().to(dayjs(repo.repository.createdAt));
  data["updatedAt"] = dayjs().to(dayjs(repo.repository.createdAt));
  data["author"] = datapackage["author"] || "";
  data["geo"] = datapackage["geo"] || {};
  data["error"] = datapackage["error"];

  return data;
};
