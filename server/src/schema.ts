import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    getThingById(id: Int!): Thing
  }

  """
  A Thing.
  """
  type Thing {
    id: Int!
    "The name of the Thing."
    name: String!
    "The description of the Thing."
    description: String!
  }
`

export default typeDefs
