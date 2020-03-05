import { Resolvers } from './graphql-types'

const resolvers = {
  Query: {
    getThingById: (_: any, { id }: any, { dataSources }: any) =>
      dataSources.bggAPI.getThingById({ id })
  }
}

export default resolvers
