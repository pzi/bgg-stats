import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    getThingById(id: Int!): Thing
  }

  "The BGG API supports things of the following type."
  enum THINGTYPE {
    boardgame
    boardgameexpansion
    boardgameaccessory
    videogame
    rpgitem
    rpgissue
  }

  """
  Any physical, tangible product in the BGG database is called a thing.
  """
  type Thing {
    "The ID of the thing."
    id: Int!

    type: THINGTYPE!

    "The name of the Thing."
    name: String!

    "The alternative names of a Thing (i.e. in different language)"
    alternate_names: [String!]

    "The description of the Thing."
    description: String

    thumbnail: String

    image: String

    yearpublished: Int

    minplayers: Int

    maxplayers: Int
  }
`

export default typeDefs
