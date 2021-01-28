/* eslint-disable no-async-promise-executor */
import * as metastore from "metastore-lib-js";
import { ALL_REPOSITRIES, SINGLE_REPOSITORY } from "./queries";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { initializeApollo } from "../lib/apolloClient";
import Github from "./Github";
import Permissions from "./Permissions";

require("dotenv").config();
dayjs.extend(relativeTime);

export class MetastoreApollo {
  constructor(initialState = null) {
    this.apolloClient = initializeApollo(initialState);
    this.github = new Github();
    this.permissions = new Permissions();
  }

  async search() {
    return new Promise(async (resolve, reject) => {
      this.apolloClient
        .query({
          query: ALL_REPOSITRIES,
        })
        .then((response) => {
          const repos = response.data.viewer.organization.repositories.nodes;
          resolve(repos);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async fetch(objectId) {
    return new Promise((resolve, reject) => {
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
