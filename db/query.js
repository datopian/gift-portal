import { gql } from "@apollo/client";

export const getRepositoriesQuery = gql`
  query RepoFiles($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      description
      url
      createdAt
      description
      updatedAt
      resourcePath
      name
      object(expression: "master:") {
        ... on Tree {
          entries {
            name
            type
            object {
              ... on Blob {
                byteSize
                text
              }
            }
          }
        }
      }
    }
  }
`;
