import { MutationResolvers } from '../graphql-types'

export const Mutation: MutationResolvers = {
  login: (_, { username, password }, { dataSources }) => {
    return dataSources.bggAPI.login({ username, password })
  }
}
