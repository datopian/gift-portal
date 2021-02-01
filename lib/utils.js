import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const processMultipleRepos = async (repos) => {
  const repoNames = Object.keys(repos)
  return new Promise((resolve) => {
    let catalogs = [];
    let desCatalogs = [];
    let repoLen = repoNames.length - 1;
    repoNames.forEach((repoName, i) => {
      const repo = repos[repoName]
      let datapackage;

      try {
        const entries = repo.object.entries;
        let _tempEntries = entries.filter((entry) => {
          return entry.name === "datapackage.json";
        });

        if (_tempEntries.length == 0) {
          throw new Error(`${repo.name} does not have a datapackage`);
        } else {
          datapackage = _tempEntries[0]["object"]["text"];
          datapackage = JSON.parse(datapackage);
          datapackage.error = false;
        }
      } catch (error) {
        // console.log(error);
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

      catalogs[repo["name"]] = data;
      desCatalogs.push(data);

      if (i == repoLen) {
        resolve([catalogs, desCatalogs]);
      }
    });
  });
};

export const processSingleRepo = (repo) => {
  let datapackage;

  try {
    const entries = repo.object.entries;
    let _tempEntries = entries.filter((entry) => {
      return entry.name === "datapackage.json";
    });

    if (_tempEntries.length == 0) {
      throw new Error(`${repo.name} does not have a datapackage`);
    } else {
      datapackage = _tempEntries[0]["object"]["text"];
      datapackage = JSON.parse(datapackage);
      datapackage.error = false;
    }
  } catch (error) {
    console.log(error);
    datapackage = {
      title: "",
      description: "",
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

export const repoHasResource = (repo) => {
  if (!repo || !repo["object"] || !repo.object["entries"]) {
    return false;
  }

  const { entries } = repo.object;

  try {
    let _tempEntries = entries.filter((entry) => {
      return entry.name === "datapackage.json";
    });
    if (_tempEntries.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export function objectIsEmpty(obj) {
  return Object.keys(obj).length == 0;
}
