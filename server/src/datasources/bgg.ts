import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { QueryGetThingByIdArgs, MutationLoginArgs } from '../graphql-types'
import { parseXMLResult, writeResult, extractNames, extractLinks, extractValue } from '../utils'


class BoardGameGeekAPI extends RESTDataSource {
  baseURL = 'https://boardgamegeek.com/xmlapi2/'

  // willSendRequest(request: RequestOptions) {
  //   console.log('request context', this.context)
  //   console.log('will send', request)
  //   // request.headers.set('Authorization', this.context.token);
  // }

  // didReceiveResponse(response: any) {
  //   // console.log('cookie?', response.headers.get('Set-Cookie'))
  //   // const cookie = request.http.headers.get('Cookie');
  //   // if (cookie) {
  //   //   context.responseCookies.push(cookie);
  //   // }

  //   // Return the response back, even when unchanged.
  //   return response;
  // }

  async login({ username, password }: MutationLoginArgs) {
    // Login does not require the XML API
    // TODO: Improve baseURL or use another RESTDataSource
    this.baseURL = 'https://boardgamegeek.com'


    const response = await this.post('login', { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return 'TODO'
  }

  async getThingById({ id }: QueryGetThingByIdArgs) {
    // TODO: Handle crappy responses.
    // TODO: Handle other types than boardgame related Thing types.
    const response = await this.get('thing', { id, stats: 0, type: "boardgame,boardgameexpansion,boardgameaccessory" })
    if (process.env.NODE_ENV === 'development') writeResult('result.xml', response)

    const res = await parseXMLResult(response)
    if (process.env.NODE_ENV === 'development') writeResult('result.json', res)

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
