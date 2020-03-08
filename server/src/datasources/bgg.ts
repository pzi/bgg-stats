import { RESTDataSource } from 'apollo-datasource-rest'
import { QueryGetThingByIdArgs } from '../graphql-types'
import { parseXMLResult, writeResult, extractNames, extractValue } from '../utils'


class BoardGameGeekAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://boardgamegeek.com/xmlapi2/'
  }

  async getThingById({ id }: QueryGetThingByIdArgs) {
    // TODO: Handle crappy responses.
    const response = await this.get('thing', { id })
    writeResult('result.xml', response)

    const res = await parseXMLResult(response)
    writeResult('result.json', res)

    if (res && res.items && 'item' in res.items) {
      const item = res.items.item

      // Attribue extractions
      const names = extractNames(item.name)

      return {
        id: item.attrs.id,
        type: item.attrs.type,
        name: names.primary,
        alternate_names: names.alternatives,
        description: item.description,
        thumbnail: item.thumbnail,
        image: item.image,
        yearpublished: extractValue(item.yearpublished),
        minplayers: extractValue(item.minplayers),
        maxplayers: extractValue(item.maxplayers)
      }
    } else {
      return null
    }
  }
}

export default BoardGameGeekAPI
