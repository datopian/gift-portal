/* eslint-disable no-async-promise-executor */
import * as metastore from "metastore-lib-js";
import { ALL_REPOSITRIES } from "./queries";
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)


export class MetastoreApollo {
  constructor(apolloClient) {
    this.apolloClient = apolloClient;
  }

  async getAllDatasets() {
    return new Promise(async (resolve, reject) => {
      this.apolloClient
        .query({
          query: ALL_REPOSITRIES,
        })
        .then(({ data }) => {
          const repos = data.viewer.organization.repositories.nodes;
          resolve(repos);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async fetch(objectId) {
    const config = {
      token: process.env.APP_GITHUB_KEY,
      org: process.env.ORGANISATION_REPO,
    };
    const storage = metastore.createMetastore("github", config);
    let dataset = await storage.fetch(objectId);
    return dataset;
  }

  async create() {}

  async update() {}
}

export const processDataFromRepository = (repo) => {
  let datapackage;

  try {
    datapackage = repo.object.entries[3]["object"]["text"];
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
      /*
        parsing error in datapackage.json. 
        Use to display in homepage and dataset page 
        **/
      error: true,
    };
  }

  let data = {};
  data["sample"] = datapackage["sample"] || [];
  data["schema"] = datapackage["resources"][0]["schema"] || [];
  data["title"] = datapackage["title"] || "";
  data["description"] =
    datapackage["description"] || repo["description"] || "No Description";
  data["resources"] = datapackage["resources"] || [];
  data["name"] = repo["name"] || "";
  data["createdAt"] = dayjs().to(dayjs(repo.createdAt));
  data["updatedAt"] = dayjs().to(dayjs(repo.createdAt));
  data["author"] = datapackage["author"] || "";
  data["geo"] = datapackage["geo"] || {};
  data["error"] = datapackage["error"];

  return data;
};
