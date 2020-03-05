import { Resolvers } from './resolvers-types'

export const resolvers = {
  Query: {
    getThingById: (_: any, { id }: any, { dataSources }: any) =>
      dataSources.bggAPI.getThingById({ id })
  }
}

export default resolvers
