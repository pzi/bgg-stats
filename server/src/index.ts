import { ApolloServer } from 'apollo-server'
import typeDefs from './schema'
import resolvers from './resolvers'
import BoardGameGeekAPI from './datasources/bgg'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: () => ({
    authCookies: []
  }),
  dataSources: () => ({
    bggAPI: new BoardGameGeekAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
