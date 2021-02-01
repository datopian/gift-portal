/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-async-promise-executor */
import * as metastore from "metastore-lib-js";
import { ALL_REPOSITRIES, SINGLE_REPOSITORY } from "./queries";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { initializeApollo } from "./apolloClient";
import Github from "./Github";
import { processMultipleRepos, processSingleRepo } from "./utils";

require("dotenv").config();
dayjs.extend(relativeTime);

export class Metastore {
  constructor(initialApolloState) {
    this.github = new Github();
    this.apolloClient = initializeApollo(initialApolloState);
  }

  async search() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.apolloClient.readQuery({
          query: ALL_REPOSITRIES,
        });
        const repos = getRepositories(response);
        const [catalogs, desCatalogs] = await processMultipleRepos(repos);
        resolve(desCatalogs);
      } catch (error) {
        console.log(error);
        //check online ??
        reject([]);
      }
    });
  }

  async fetch(name) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.apolloClient.readQuery({
          query: SINGLE_REPOSITORY,
          variables: { name },
        });
        const repo = processSingleRepo(response.repository);
        resolve(repo);
      } catch (error) {
        console.log(error);
        reject([]);
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

function getRepositories(response) {
  const { nodes } = response.viewer.organization.repositories;
  const repos = {};
  nodes.forEach((node) => {
    repos[node.name] = node;
  });
  return repos;
}
