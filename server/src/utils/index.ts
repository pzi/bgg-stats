import xml2js from 'xml2js'
import { writeFile, fstat, mkdir, link } from 'fs'
import { Link, Linktype } from '../graphql-types'

interface Data {
  [key: string]: any
}

interface AttrValue {
  attrs?: {
    value: string
  }
}

export async function parseXMLResult(data: any) {
  try {
    const result: Data = await xml2js.parseStringPromise(data, {
      attrkey: 'attrs',
      charkey: 'content',
      explicitArray: false,
    })
    return result
  } catch (error) {
    console.error(error)
    return null
  }
}

/** Method to write query results to disk for validation during development. */
export const writeResult = (filename: string, data: string | object | null) => {
  let d = data
  const folder = '_data'
  const path = `${folder}/${filename}`

  if (typeof data === 'object') {
    d = JSON.stringify(d, null, 2)
  }

  mkdir(folder, err => {
    if (err && err.code !== 'EEXIST') throw new Error(`Error creating folder '${folder}'.`)
    return null
  })

  return writeFile(path, d, err => {
    if (err) return console.log(err);
    console.log(`${path} written...`)
  })
}

interface NameAttr {
  attrs: {
    type: 'primary' | 'alternate'
    sortindex: string
    value: string
  }
}

export const extractNames = (names: NameAttr[] | NameAttr) => {
  const result: { primary: string | null, alternate: string[] | null } = {
    primary: null,
    alternate: null
  }
  let nameArr = names

  if (!Array.isArray(nameArr)) nameArr = [nameArr]

  nameArr.forEach(name => {
    if (name.attrs.type === 'primary') {
      result.primary = name.attrs.value
    } else {
      if (!result.alternate) {
        result.alternate = new Array(name.attrs.value)
      } else {
        result.alternate.push(name.attrs.value)
      }
    }
  })

  return result
}

interface LinkAttr {
  attrs: {
    type: Linktype
    id: string
    value: string
    inbound?: string // Only boardgame accessories seem to have an inbound prop.
  }
}

export const extractLinks = (links: LinkAttr[] | LinkAttr): Link[] | null => {
  const result: Link[] = []
  let linkArr = links

  if (!Array.isArray(linkArr)) linkArr = [linkArr]

  if (linkArr.length) {
    linkArr.forEach(({ attrs: { type, id, value, inbound } }) =>
      result.push({
        type,
        id: Number(id),
        value,
        inbound: inbound ? inbound === 'true' : null
      }))
    return result
  } else {
    return null
  }
}


export const extractValue = (attr?: AttrValue): string | number | null => {
  if (!attr) return null
  const value = attr.attrs?.value ?? null
  if (value === undefined) return null
  if (!isNaN(Number(value))) return Number(value)
  if (value === 'string') return value
  return null
}
