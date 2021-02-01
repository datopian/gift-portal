/* eslint-disable max-len */
import { useMemo } from "react";
import { ApolloClient } from "@apollo/client";
import { cache } from "./cache";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: { Authorization: `Bearer ${process.env.APP_GITHUB_KEY}` },
    cache,
    connectToDevTools: true,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
