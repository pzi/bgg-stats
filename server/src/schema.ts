import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    getThingById(id: Int!): Thing
  }

  type Mutation {
    login(username: String! password: String!): String
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

  type Name {
    "The name of the Thing."
    primary: String!
    "The alternative names of a Thing (i.e. in different language)"
    alternate: [String!]
  }

  enum LINKTYPE {
    boardgameaccessory,
    boardgameartist,
    boardgamecategory,
    boardgamecompilation,
    boardgamedesigner,
    boardgameexpansion,
    boardgamefamily,
    boardgameimplementation,
    boardgamemechanic,
    boardgamepublisher
  }

  type Link {
    type: LINKTYPE!
    id: Int!
    value: String!
    inbound: Boolean # Only accessories and implementations seem to have an inbound prop.
  }
  
  """
  Any physical, tangible product in the BGG database is called a thing.
  """
  type Thing {
    "The ID of the thing."
    id: Int!
    
    "The BGG database type of the Thing."
    type: THINGTYPE!

    "All the names of a Thing."
    name: Name

    "The description of the Thing."
    description: String

    "High resolution image of the Thing."
    image: String

    "Smaller version of the image."
    thumbnail: String

    "The year when the Thing was published."
    yearpublished: Int

    "The advertised minimum player number."
    minplayers: Int

    "The advertised maximum player number."
    maxplayers: Int

    "The advertised playing time."
    playingtime: Int

    "The advertised minimum playing time."
    minplaytime: Int

    "The advertised maximum playing time."
    maxplaytime: Int

    "The recommended minimum player age."
    minage: Int

    link: [Link]
  }
`

export default typeDefs
