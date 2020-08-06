import colors from 'colors'
import { BoardGamePaid, BoardGameValue } from './types'
import { isBoardgame, isBoardgameWithPrivateInfo, pad } from './utils'

colors.enable()

export function reformatter(items: any[]): BoardGameValue[] {
  const boardgames = items.map((item) => {
    if (isBoardgame(item)) {
      return {
        name: item.name[0].content,
        paid: isBoardgameWithPrivateInfo(item)
          ? Number(item.privateinfo[0].attrs.pricepaid)
          : undefined,
      }
    } else {
      return {
        name: '__Invalid__',
      }
    }
  })
  return boardgames
}

export function calculateTotal(games: BoardGameValue[]) {
  console.log(`Calculating total value of ${games.length} games...`)
  console.log(`--------------------------------------------------------------`)

  const total = games.reduce((currentValue, { name, paid }) => {
    if ((paid !== null || paid !== undefined) && typeof paid === 'number') {
      return paid + currentValue
    } else {
      return currentValue
    }
  }, 0)

  // TODO use reduce instead and create single object { withPrice, withoutPrice}
  const gamesWithoutPrice = games.filter((game) => game.paid === undefined || game.paid === null)

  if (gamesWithoutPrice.length === games.length) {
    return console.log('No price information available.'.bgYellow.black)
  }

  const averageGamePrice = total / (games.length - gamesWithoutPrice.length)

  const gamesWithPrice = games.filter(
    (game) => game.paid // exclude 0 | null | undefined
  ) as BoardGamePaid[]

  gamesWithPrice
    .sort((a, b) => {
      if (a.paid && b.paid) {
        if (a.paid < b.paid) return -1
        if (a.paid > b.paid) return 1
      }
      return 0
    })
    .forEach((game) => console.log(`$${pad(game.paid.toFixed(2), 7, ' ')}  ${game.name}`))

  console.log(`==============================================================`)

  gamesWithoutPrice.forEach(({ name }) => console.log(`No value: ${name}`))

  console.log(`--------------------------------------------------------------`)

  console.log(`Missing a value for ${gamesWithoutPrice.length} games.`.red)

  console.log(
    `Avg. $${averageGamePrice.toFixed(2)} per game.`.underline,
    `(Potentially another $${(averageGamePrice * gamesWithoutPrice.length).toFixed(
      2
    )} worth of games to add)`.italic
  )

  console.log(`Total: $${total.toFixed(2)}`.green.bold)
}
