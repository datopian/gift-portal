/* eslint-disable no-async-promise-executor */
import * as metastore from "metastore-lib-js";
import { ALL_REPOSITRIES, SINGLE_REPOSITORY } from "./queries";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { initializeApollo } from "../lib/apolloClient";
import Github from "./Github";
import Permissions from "./Permissions";
import { repositoriesVar } from "./cache";

require("dotenv").config();
dayjs.extend(relativeTime);

export class MetastoreApollo {
  constructor() {
    this.apolloClient = initializeApollo();
    this.github = new Github();
    this.permissions = new Permissions();
    if (cacheIsEmpty(repositoriesVar())) {
      this.initCache(repositoriesVar);
    }
  }

  async initCache(cacheVar) {
    cacheVar({});
    const response = await runQueryWithApollo(
      this.apolloClient,
      ALL_REPOSITRIES
    );
    const repos = getRepositories(response);
    repositoriesVar({ ...repos });
  }

  async search() {
    return new Promise(async (resolve, reject) => {
      if (!cacheIsEmpty(repositoriesVar())) {
        try {
          console.info("Returning cached data");
          resolve(repositoriesVar());
        } catch (error) {
          console.log(error);
          reject(error);
        }
      } else {
        const response = await runQueryWithApollo(
          this.apolloClient,
          ALL_REPOSITRIES
        );
        const repos = getRepositories(response);
        repositoriesVar({ ...repos });
        resolve(repos);
      }
    });
  }

  async fetch(objectId) {
    return new Promise((resolve, reject) => {
      if (!cacheIsEmpty(repositoriesVar())) {
        try {
          const repos = repositoriesVar()
          console.info("Returning cached data");
          resolve(repos[objectId]);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      } else {
        this.apolloClient
          .query({
            query: SINGLE_REPOSITORY,
            variables: { name: objectId },
          })
          .then(({ data }) => {            
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
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
  }

  async delete() {
    throw new Error("Method has not been implemented!");
  }
}

function runQueryWithApollo(apolloClient, query) {
  return new Promise((resolve, reject) => {
    apolloClient
      .query({
        query: query,
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

function cacheIsEmpty(cacheVar) {
  return Object.keys(cacheVar).length == 0;
}
