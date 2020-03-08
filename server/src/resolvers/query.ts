import { QueryResolvers } from '../graphql-types'

export const Query: QueryResolvers = {
  getThingById: (_, { id }, { dataSources }) =>
    dataSources.bggAPI.getThingById({ id })
}
