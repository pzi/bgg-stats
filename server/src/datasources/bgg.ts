import { RESTDataSource } from 'apollo-datasource-rest'
import xml2js from 'xml2js'
import { QueryGetThingByIdArgs } from '../graphql-types'

async function parseResult(data: any) {
  try {
    const result = await xml2js.parseStringPromise(data, {
      attrkey: 'attrs',
      charkey: 'content'
    })
    return result
  } catch (error) {
    console.error(error)
  }
}

class BoardGameGeekAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://boardgamegeek.com/xmlapi2/'
  }

  async getThingById({ id }: QueryGetThingByIdArgs) {
    const response = await this.get('thing', { id })
    const res = await parseResult(response)
    if ('item' in res.items) {
      const item = res.items.item[0]
      return {
        id: item.attrs.id,
        name: item.name[0].attrs.value,
        description: item.description[0]
      }
    } else {
      return null
    }
  }
}

export default BoardGameGeekAPI
