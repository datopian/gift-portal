import { gql } from '@apollo/client'
const ORG = process.env.ORGANISATION_REPO

export const ALL_REPOSITRIES = gql`
  {
    viewer {
      organization(login: "${ORG}") {
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
