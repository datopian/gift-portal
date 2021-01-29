/* eslint-disable max-len */
import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repository: {
          read() {
            return repositoryVar();
          },
        },
        repositories: {
          read() {
            return repositoriesVar();
          },
        },
      },
    },
  },
});

export const repositoryVar = makeVar({});
export const repositoriesVar = makeVar({})
