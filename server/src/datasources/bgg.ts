import { RESTDataSource } from 'apollo-datasource-rest'
import { QueryGetThingByIdArgs } from '../graphql-types'
import { parseXMLResult, writeResult, extractNames, extractLinks, extractValue } from '../utils'


class BoardGameGeekAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://boardgamegeek.com/xmlapi2/'
  }

  async getThingById({ id }: QueryGetThingByIdArgs) {
    // TODO: Handle crappy responses.
    const response = await this.get('thing', { id, stats: 1 })
    writeResult('result.xml', response)

    const res = await parseXMLResult(response)
    writeResult('result.json', res)

    if (res && res.items && 'item' in res.items) {
      const item = res.items.item

      // Attribue extractions
      const names = extractNames(item.name)
      const links = extractLinks(item.link)

      return {
        id: item.attrs.id,
        type: item.attrs.type,
        name: { ...names },
        description: item.description,
        thumbnail: item.thumbnail,
        image: item.image,
        yearpublished: extractValue(item.yearpublished),
        minplayers: extractValue(item.minplayers),
        maxplayers: extractValue(item.maxplayers),
        playingtime: extractValue(item.playingtime),
        minplaytime: extractValue(item.minplaytime),
        maxplaytime: extractValue(item.maxplaytime),
        minage: extractValue(item.minage),
        link: links
      }
    } else {
      return null
    }
  }
}

export default BoardGameGeekAPI
