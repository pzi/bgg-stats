import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { QueryGetThingByIdArgs, MutationLoginArgs } from '../graphql-types'
import { parseXMLResult, writeResult, extractNames, extractLinks, extractValue } from '../utils'
import { Response } from 'apollo-server-env'

class BoardGameGeekAPI extends RESTDataSource {
  baseURL = 'https://boardgamegeek.com/xmlapi2/'

  // willSendRequest(request: RequestOptions) {
  // console.log('request context', this.context.authCookies)
  // console.log('will send', request)
  // request.headers.set('Authorization', this.context.token);
  //   return request as any
  // }

  async didReceiveResponse<TResult = any>(
    response: Response
  ): Promise<TResult> {
    const cookies = response.headers.get('set-cookie');
    if (cookies) {
      // console.log('cookies', cookies)
      this.context.authCookies.push(cookies);
    }
    if (response.ok) {
      return (this.parseBody(response) as any) as Promise<TResult>;
    } else {
      throw await this.errorFromResponse(response);
    }
  }

  async login({ username, password }: MutationLoginArgs) {
    // Login does not require the XML API
    // TODO: Improve baseURL or use another RESTDataSource
    this.baseURL = 'https://boardgamegeek.com'
    const response = await this.post(`login/?username=${username}&password=${password}`)

    if (response.includes('Login Successful')) {
      return 'Login Sucessful'
    } else if (response.includes('Invalid Username/Password')) {
      return 'Invalid Username/Password'
    } else if (response.includes('Already Registered? Log In Now.')) {
      return 'Missing Username/Password'
    } else {
      return 'Unknown error occurred.'
    }
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
