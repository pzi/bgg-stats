import fs from 'fs'
import xml2js from 'xml2js'
import yargs from 'yargs'
import { reformatter, calculateTotal } from './reformatter'
import { fetchCollection } from './fetch'
import { isCollection } from './utils'

const argv = yargs
  .option('path', {
    alias: 'p',
    describe: 'Path to the XML file to parse.',
    type: 'string'
  })
  .help().argv

async function parseResult(data: any) {
  try {
    const result = await xml2js.parseStringPromise(data, {
      attrkey: 'attrs',
      charkey: 'content'
    })
    if (isCollection(result)) {
      calculateTotal(reformatter(result.items.item))
    } else {
      console.log(data)
    }
  } catch (error) {
    console.error(error)
  }
}

if (argv.path) {
  fs.readFile(argv.path, async (err, data) => {
    if (err) return console.error(err.message)
    parseResult(data)
  })
}

const result = (error: any, statusCode?: any, headers?: any, body?: any) => {
  if (error) return console.error(error.message)

  if (statusCode === 202) {
    return console.log('Generating updated results...')
  }
  parseResult(body)
}

fetchCollection(result)
