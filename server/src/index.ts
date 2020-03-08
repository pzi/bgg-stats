import { ApolloServer } from 'apollo-server'
import typeDefs from './schema'
import resolvers from './resolvers'
import BoardGameGeekAPI from './datasources/bgg'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    return {
      foo: 'bar'
    }
  },
  dataSources: () => ({
    bggAPI: new BoardGameGeekAPI()
  })
})

server.listen().then(({ url }: { url: any }) => {
  console.log(`🚀 Server ready at ${url}`)
})
