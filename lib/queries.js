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

// export const ALL_REPOSITRIES = gql``
