import { Collection, BoardGame, BoardGameWithPrivateInfo } from './types'

export function isCollection(result: any): result is Collection {
  if (result && 'items' in result) {
    if ('attrs' in result.items && 'item' in result.items) {
      return true
    }
  }
  return false
}

export function isBoardgame(item: object): item is BoardGame {
  return 'numplays' in item
}

export function isBoardgameWithPrivateInfo(
  item: BoardGame
): item is BoardGameWithPrivateInfo {
  return 'privateinfo' in item
}
