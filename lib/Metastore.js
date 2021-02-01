/* eslint-disable max-len */
/* eslint-disable no-async-promise-executor */
import * as metastore from "metastore-lib-js";
import { ALL_REPOSITRIES, SINGLE_REPOSITORY } from "./queries";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { initializeApollo } from "./apolloClient";
import Github from "./Github";
import { cacheStoreVar } from "./cache";

require("dotenv").config();
dayjs.extend(relativeTime);

const SUPPORTED_VALUES_IN_CACHE = ["repos", "session", "user"];

export class Metastore {
  constructor(cache) {
    this.github = new Github();

    if (!cache) {
      this.apolloClient = initializeApollo();
      this.initCache();
    } else {
      this.apolloClient = initializeApollo(cache);
      cacheStoreVar(cache);
    }
  }

  async initCache() {
    //perform all cache initialization here
    //GET ALL REPOSITORIES
    const response = await runQueryWithApollo(
      this.apolloClient,
      ALL_REPOSITRIES
    );
    const repos = getRepositories(response);

    cacheStoreVar({ repos: repos });
    // cacheStoreVar({ session: sessionData }); You can set other global variables here as well
    // cacheStoreVar({ permissions: permissionData });
    return cacheStoreVar();
  }

  async search(term) {
    if (SUPPORTED_VALUES_IN_CACHE.includes(term)) {
      return cacheStoreVar()[term];
    } else {
      throw new Error(
        `Search term not supported in cache. Try one of ${SUPPORTED_VALUES_IN_CACHE}`
      );
    }
  }

  async fetch(objectId) {
    return new Promise(async (resolve, reject) => {
      const repo = cacheStoreVar()["repos"][objectId]; //check if available in cache
      if (repo) {
        resolve(repo);
      } else {
        try {
          const response = await runQueryWithApollo(
            this.apolloClient,
            SINGLE_REPOSITORY,
            { name: objectId }
          );
          const repo = getRepositories(response);
          resolve(repo);
        } catch (error) {
          console.log(error);
          reject([]);
        }
      }
    });
  }

  async create(objectId, userInfo, metadata, description, token) {
    try {
      const user = { name: userInfo.name, email: userInfo.email };
      const config = {
        defaultAuthor: user,
        token,
        org: process.env.NEXT_PUBLIC_ORG_NAME,
        lfsServerUrl: process.env.GIFTLESS_SERVER,
      };

      const storage = metastore.createMetastore("github", config);

      const response = await storage.create({
        objectId,
        metadata,
        defaultAuthor: user,
        description,
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(objectId, userInfo, metadata, readMe, token) {
    try {
      const user = { name: userInfo.name, email: userInfo.email };
      const config = {
        defaultAuthor: user,
        token,
        org: process.env.NEXT_PUBLIC_ORG_NAME,
        lfsServerUrl: process.env.GIFTLESS_SERVER,
      };
      const storage = metastore.createMetastore("github", config);

      const response = await storage.update({
        objectId,
        metadata,
        readMe,
        branch: "main",
      });

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete() {
    throw new Error("Method has not been implemented!");
  }
}

function runQueryWithApollo(apolloClient, query, variables) {
  return new Promise((resolve, reject) => {
    apolloClient
      .query({
        query: query,
        variable: variables,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

function getRepositories(response) {
  const { nodes } = response.data.viewer.organization.repositories;
  const repos = {};
  nodes.forEach((node) => {
    repos[node.name] = node;
  });
  return repos;
}
