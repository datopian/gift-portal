import { graphql } from 'msw'
import datasets from './datasets'

export const handlers =[
  graphql.query('Datasets', (req,res, ctx)=> res(ctx.data(datasets.list))),
  
  graphql.query('RepoFiles', (req, res,ctx)=> {
    const { name } = req.variables
    const dataset = datasets.createOrEdit.find(item => 
      item.repository.name === name
    )
    return res(ctx.data(dataset))
  })
]