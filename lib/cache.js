import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cacheStore: {
          read() {
            return cacheStoreVar();
          },
        }
      },
    },
  },
});

export const cacheStoreVar = makeVar({});
