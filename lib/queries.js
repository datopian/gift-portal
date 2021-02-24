import { gql } from '@apollo/client'

export const ALL_REPOSITRIES = gql`

query Datasets {
    viewer {
      organization(login: "gift-data") {
        repositories(
          first: 100
          affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
          ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
        ) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            name
            description
            url
            createdAt
            updatedAt
            resourcePath
            viewerPermission
            id
            owner {
              login
            }
            object(expression: "main:") {
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Blob {
                      oid
                      text
                      byteSize
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const SINGLE_REPOSITORY = gql`
  query RepoFiles($name: String!) {
    repository(owner: "gift-data", name: $name) {
      description
      url
      createdAt
      description
      updatedAt
      resourcePath
      name
      id
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
            history(first: 1) {
              edges {
                node {
                  oid
                  message
                  author {
                    name
                    email
                    date
                  }
                }
              }
            }
          }
        }
      }
      object(expression: "main:") {
        ... on Tree {
          entries {
            name
            type
            object {
              ... on Blob {
                byteSize
                oid
                text
              }
            }
          }
        }
      }
    }
  }
`

export const PERMISSIONS = gql`
  query Permissions {
    organization(login: "gift-data") {
      repositories(first: 100) {
        totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        nodes {
          collaborators(first: 100) {
            edges {
              permission
              node {
                login
              }
            }
          }
          name
          isPrivate
        }
      }
    }
  }
`