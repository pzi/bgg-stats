import { QueryResolvers } from '../graphql-types'

export const Query: QueryResolvers = {
  getThingById: (_, { id }, { dataSources }) => {
    console.log('login context', dataSources.bggAPI.context)
    return dataSources.bggAPI.getThingById({ id })
  }
}
