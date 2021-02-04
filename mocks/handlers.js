import { graphql } from 'msw'
import datasets from './datasets'


export const handlers =[
  graphql.query('Datasets', (req,res, ctx)=> {
    return res(ctx.data(datasets))
  })
]