require("dotenv").config();
import fetch, { Response } from "node-fetch";

function handleResponse (response: Response) {
  let contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    // return handleJSONResponse(response)
    return response.json()
  } else if (contentType?.includes('text/html') || contentType?.includes('text/xml')) {
    return response.text()
  } else {
    throw new Error(`Content-type ${contentType} not supported.`)
  }
}

type fetchCollection = (callback: (error: string | null, status?: number | null, header?: any, body?: any) => void) => void
export const fetchCollection: fetchCollection = (callback) => {
  const query = new URLSearchParams()
  query.set('username', `${process.env.BGG_USERNAME}`)
  query.set('own', '1')
  query.set('showprivate', '1')
  query.set('prevowned', '0')
  query.set('preordered', '0')
  query.set('wanttobuy', '0')
  query.set('wishlist', '0')
  query.set('want', '0')

  fetch(
    `https://boardgamegeek.com/xmlapi2/collection/?${query.toString()}`,
    {
      method: "POST",
      headers: {
        Cookie:
        `bggusername=${process.env.BGG_USERNAME}; bggpassword=${process.env.BGG_PASSWORD}`
      }
    }
  ).then(handleResponse)
    .then(text => callback(null, null, null, text))
    .catch(error => callback(error));
}

