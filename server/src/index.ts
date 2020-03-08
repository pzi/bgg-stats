import { ApolloServer } from 'apollo-server'
import typeDefs from './schema'
import resolvers from './resolvers'
import BoardGameGeekAPI from './datasources/bgg'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  dataSources: () => ({
    bggAPI: new BoardGameGeekAPI()
  })
})

server.listen().then(({ url }: { url: any }) => {
  console.log(`🚀 Server ready at ${url}`)
})
