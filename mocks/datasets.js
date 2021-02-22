/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
const list = {
  'viewer': {
    '__typename': 'User',
    'organization': {
      '__typename': 'Organization',
      'repositories': {
        '__typename': 'RepositoryConnection',
        'totalCount': 19,
        'pageInfo': {
          '__typename': 'PageInfo',
          'endCursor': 'Y3Vyc29yOnYyOpHOE9peuw==',
          'hasNextPage': false
        },
        'nodes': [
          {'__typename':'Repository',
            'name':'Demo-Repo',
            'description':'This is a demo repository',
            'url':'https://github.com/gift-data/Demo-Repo',
            'createdAt':'2021-02-09T12:05:08Z',
            'updatedAt':'2021-02-10T15:16:51Z',
            'resourcePath':'/gift-data/Demo-Repo',
            'viewerPermission':'ADMIN',
            'id':'MDEwOlJlcG9zaXRvcnkzMzczOTEzOTM=',
            'owner':{
              '__typename':'Organization',
              'login':'gift-data'
            },'object':{
              '__typename':'Tree',
              'entries':[
                {
                  '__typename':'TreeEntry',
                  'name':'.gitattributes',
                  'type':'blob',
                  'object':{
                    '__typename':'Blob',
                    'oid':'e181bb3a12dd89be2c1375db1806cd54ce4fb79f',
                    'text':'data/neighbourhoods.csv filter=lfs diff=lfs merge=lfs -text\n',
                    'byteSize':60
                  }
                },
                {
                  '__typename':'TreeEntry',
                  'name':'.lfsconfig',
                  'type':'blob',
                  'object':{
                    '__typename':'Blob',
                    'oid':'07d453b8bad93f9f4b9bbc44a82e6d4b3812d4c3',
                    'text':'[remote "origin"]\n\tlfsurl = https://giftless-gift.herokuapp.com/',
                    'byteSize':64
                  }
                },
                {
                  '__typename':'TreeEntry',
                  'name':'README.md',
                  'type':'blob',
                  'object':{
                    '__typename':'Blob',
                    'oid':'05872fe8da7f166b680b087c6f7760f67d3ba346',
                    'text':'This is a demo repository',
                    'byteSize':25
                  }
                },
                {
                  '__typename':'TreeEntry',
                  'name':'data',
                  'type':'tree',
                  'object':{
                    '__typename':'Tree'
                  }
                },
                {
                  '__typename':'TreeEntry',
                  'name':'datapackage.json',
                  'type':'blob',
                  'object':{
                    '__typename':'Blob',
                    'oid':'b7f7b10dd02ffb8299b4db3de63cdc909d9d5691',
                    'text':'{\n  "sample": [],\n  "title": "",\n  "description": "This is a demo repository",\n  "name": "Demo-Repo",\n  "createdAt": "a day ago",\n  "updatedAt": "a day ago",\n  "author": "",\n  "geo": {},\n  "error": true,\n  "id": "MDEwOlJlcG9zaXRvcnkzMzczOTEzOTM=",\n  "resources": [\n    {\n      "bytes": 2070,\n      "hash": "fb0710c22d13ec34fb33b7bddc294bdcebcea86e44f40a9cb0a1e95a84df1f9f",\n      "format": "csv",\n      "schema": {\n        "fields": [\n          {\n            "title": "neighbourhood_group",\n            "name": "neighbourhood_group",\n            "slug": "neighbourhood_group",\n            "type": "string",\n            "format": "default",\n            "columnType": "activity:generic:contract:code",\n            "conceptType": "activity",\n            "options": []\n          },\n          {\n            "title": "neighbourhood",\n            "name": "neighbourhood",\n            "slug": "neighbourhood",\n            "type": "string",\n            "format": "default",\n            "columnType": "activity:generic:contract:code",\n            "conceptType": "activity",\n            "options": []\n          }\n        ],\n        "missingValues": [\n          ""\n        ]\n      },\n      "encoding": "utf-8",\n      "mediatype": "text/csv",\n      "name": "neighbourhoods.csv",\n      "dialect": {\n        "delimiter": ",",\n        "quoteChar": "\\""\n      },\n      "path": "data/neighbourhoods.csv",\n      "title": "neighbourhoods",\n      "sample": [\n        {\n          "neighbourhood_group": "",\n          "neighbourhood": "Abolição"\n        },\n        {\n          "neighbourhood_group": "",\n          "neighbourhood": "Acari"\n        },\n        {\n          "neighbourhood_group": "",\n          "neighbourhood": "Água Santa"\n        },\n        {\n          "neighbourhood_group": "",\n          "neighbourhood": "Alto da Boa Vista"\n        }\n      ],\n      "columns": [\n        {\n          "Header": "neighbourhood_group",\n          "accessor": "neighbourhood_group"\n        },\n        {\n          "Header": "neighbourhood",\n          "accessor": "neighbourhood"\n        }\n      ]\n    }\n  ],\n  "model": {\n    "dimensions": {\n      "activity": {\n        "dimensionType": "activity",\n        "primaryKey": [\n          "neighbourhood_group",\n          "neighbourhood"\n        ],\n        "attributes": {\n          "neighbourhood_group": {\n            "source": "neighbourhood_group",\n            "title": "neighbourhood_group"\n          },\n          "neighbourhood": {\n            "source": "neighbourhood",\n            "title": "neighbourhood"\n          }\n        }\n      }\n    },\n    "measures": {}\n  },\n  "revision": 0\n}',
                    'byteSize':2609
                  }
                }
              ]
            }
          },
          {
            '__typename': 'Repository',
            'name': 'Dashboard-demo',
            'description': null,
            'url': 'https://github.com/gift-data/Dashboard-demo',
            'createdAt': '2021-01-26T12:28:56Z',
            'updatedAt': '2021-01-26T12:31:03Z',
            'resourcePath': '/gift-data/Dashboard-demo',
            'viewerPermission': 'ADMIN',
            'id': 'MDEwOlJlcG9zaXRvcnkzMzMwNzgyMDM=',
            'owner': {
              '__typename': 'Organization',
              'login': 'gift-data'
            },
            'object': {
              '__typename': 'Tree',
              'entries': [
                {
                  '__typename': 'TreeEntry',
                  'name': 'README.md',
                  'type': 'blob',
                  'object': {
                    '__typename': 'Blob',
                    'oid': 'f48eafb104c2ccb364a1f0a06bb314cbda322398',
                    'text': '# Dashboard-demo',
                    'byteSize': 16
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
}

const createOrEdit = [{
  'repository':{
    '__typename':'Repository',
    'description':'This is a demo repository',
    'url':'https://github.com/gift-data/Demo-Repo',
    'createdAt':'2021-02-09T12:05:08Z',
    'updatedAt':'2021-02-10T15:16:51Z',
    'resourcePath':'/gift-data/Demo-Repo',
    'name':'Demo-Repo',
    'id':'MDEwOlJlcG9zaXRvcnkzMzczOTEzOTM=',
    'ref':{
      '__typename':'Ref',
      'target':{
        '__typename':'Commit',
        'history':{
          '__typename':'CommitHistoryConnection',
          'edges':[{
            '__typename':'CommitEdge',
            'node':{
              '__typename':'Commit',
              'oid':'efda46113f11060c198cdd0421efbfe92dde66ab',
              'message':'Add Datapackage',
              'author':{
                '__typename':'GitActor',
                'name':'Rising Odegua',
                'email':'risingodegua@gmail.com',
                'date':'2021-02-10T16:16:47+01:00'
              }
            }
          }]
        }
      }
    },
    'object':{
      '__typename':'Tree',
      'entries':[{
        '__typename':'TreeEntry',
        'name':'.gitattributes',
        'type':'blob',
        'object':{
          '__typename':'Blob',
          'byteSize':60,
          'oid':'e181bb3a12dd89be2c1375db1806cd54ce4fb79f',
          'text':'data/neighbourhoods.csv filter=lfs diff=lfs merge=lfs -text\n'
        }
      },
      {
        '__typename':'TreeEntry',
        'name':'.lfsconfig',
        'type':'blob',
        'object':{
          '__typename':'Blob',
          'byteSize':64,
          'oid':'07d453b8bad93f9f4b9bbc44a82e6d4b3812d4c3',
          'text':'[remote "origin"]\n\tlfsurl = https://giftless-gift.herokuapp.com/'
        }
      },
      {
        '__typename':'TreeEntry',
        'name':'README.md',
        'type':'blob',
        'object':{
          '__typename':'Blob',
          'byteSize':25,
          'oid':'05872fe8da7f166b680b087c6f7760f67d3ba346',
          'text':'This is a demo repository'
        }
      },
      {
        '__typename':'TreeEntry',
        'name':'data',
        'type':'tree',
        'object':{
          '__typename':'Tree'
        }
      },
      {
        '__typename':'TreeEntry',
        'name':'datapackage.json',
        'type':'blob',
        'object':{
          '__typename':'Blob',
          'byteSize':2609,
          'oid':'b7f7b10dd02ffb8299b4db3de63cdc909d9d5691',
          'text':`{\n  
            \"sample\": [],\n  
            \"title\": \"\",\n  
            \"description\": \"This is a demo repository\",\n  
            \"name\": \"Demo-Repo\",\n  
            \"createdAt\": \"a day ago\",\n  
            \"updatedAt\": \"a day ago\",\n  
            \"author\": \"\",\n  
            \"geo\": {},\n  
            \"error\": true,\n  
            \"id\": \"MDEwOlJlcG9zaXRvcnkzMzczOTEzOTM=\",\n  
            \"resources\": [\n    
              {\n      
                \"bytes\": 2070,\n      
                \"hash\": \"fb0710c22d13ec34fb33b7bddc294bdcebcea86e44f40a9cb0a1e95a84df1f9f\",\n      
                \"format\": \"csv\",\n      
                \"schema\": {\n        
                  \"fields\": [\n          
                    {\n            
                      \"title\": \"neighbourhood_group\",\n            
                      \"name\": \"neighbourhood_group\",\n            
                      \"slug\": \"neighbourhood_group\",\n            
                      \"type\": \"string\",\n            
                      \"format\": \"default\",\n            
                      \"columnType\": \"activity:generic:contract:code\",\n            
                      \"conceptType\": \"activity\",\n            
                      \"options\": []\n          
                    },\n          
                    {\n            
                      \"title\": \"neighbourhood\",\n            
                      \"name\": \"neighbourhood\",\n            
                      \"slug\": \"neighbourhood\",\n            
                      \"type\": \"string\",\n            
                      \"format\": \"default\",\n            
                      \"columnType\": \"activity:generic:contract:code\",\n            
                      \"conceptType\": \"activity\",\n            
                      \"options\": []\n          
                    }\n        
                  ],\n        
                  \"missingValues\": [\n          
                    \"\"\n        
                  ]\n      
                },\n      
                \"encoding\": \"utf-8\",\n      
                \"mediatype\": \"text/csv\",\n      
                \"name\": \"neighbourhoods.csv\",\n      
                \"dialect\": {\n        
                  \"delimiter\": \",\",\n        
                  \"quoteChar\": \"\\\"\"\n      
                },\n      
                \"path\": \"data/neighbourhoods.csv\",\n      
                \"title\": \"neighbourhoods\",\n      
                \"sample\": [\n        
                  {\n          
                    \"neighbourhood_group\": \"\",\n          
                    \"neighbourhood\": \"Abolição\"\n        
                  },\n        
                  {\n          
                    \"neighbourhood_group\": \"\",\n          
                    \"neighbourhood\": \"Acari\"\n        
                  },\n        
                  {\n          
                    \"neighbourhood_group\": \"\",\n          
                    \"neighbourhood\": \"Água Santa\"\n        
                  },\n        
                  {\n          
                    \"neighbourhood_group\": \"\",\n          
                    \"neighbourhood\": \"Alto da Boa Vista\"\n        
                  }\n      
                ],\n      
                \"columns\": 
                [\n        
                  {\n          
                    \"Header\": \"neighbourhood_group\",\n          
                    \"accessor\": \"neighbourhood_group\"\n        
                  },\n        
                  {\n          
                    \"Header\": \"neighbourhood\",\n          
                    \"accessor\": \"neighbourhood\"\n        
                  }\n      
                ]\n    
              }\n  
            ],\n  
            \"model\": {\n    
              \"dimensions\": {\n      
                \"activity\": {\n        
                  \"dimensionType\": \"activity\",\n        
                  \"primaryKey\": [\n          
                    \"neighbourhood_group\",\n          
                    \"neighbourhood\"\n        
                  ],\n        
                  \"attributes\": {\n          
                    \"neighbourhood_group\": {\n            
                      \"source\": \"neighbourhood_group\",\n            
                      \"title\": \"neighbourhood_group\"\n          
                    },\n          
                    \"neighbourhood\": {\n            
                      \"source\": \"neighbourhood\",\n            
                      \"title\": \"neighbourhood\"\n          
                    }\n        
                  }\n      
                }\n    
              },\n    
              \"measures\": {}\n  
            },\n  
            \"revision\": 0\n
          }`
        }
      }]
    }
  }
},
{
  'repository': {
    '__typename': 'Repository',
    'description': null,
    'url': 'https://github.com/gift-data/Dashboard-demo',
    'createdAt': '2021-01-26T12:28:56Z',
    'updatedAt': '2021-01-26T12:31:03Z',
    'resourcePath': '/gift-data/Dashboard-demo',
    'name': 'Dashboard-demo',
    'id': 'MDEwOlJlcG9zaXRvcnkzMzMwNzgyMDM=',
    'ref': {
      '__typename': 'Ref',
      'target': {
        '__typename': 'Commit',
        'history': {
          '__typename': 'CommitHistoryConnection',
          'edges': [{
            '__typename': 'CommitEdge',
            'node': {
              '__typename': 'Commit',
              'oid': 'f7c6f787e6bd43dc8b4d8b4904f04ddce341f34a',
              'message': 'Initial commit',
              'author': {
                '__typename': 'GitActor',
                'name': 'Rising Odegua',
                'email': 'risingodegua@gmail.com',
                'date': '2021-01-26T13:28:58+01:00'
              }
            }
          }]
        }
      }
    },
    'object': {
      '__typename': 'Tree',
      'entries': [{
        '__typename': 'TreeEntry',
        'name': 'README.md',
        'type': 'blob',
        'object': {
          '__typename': 'Blob',
          'byteSize': 16,
          'oid': 'f48eafb104c2ccb364a1f0a06bb314cbda322398',
          'text': '# Dashboard-demo'
        }
      }]
    }
  }
}
]


module.exports = { list, createOrEdit }