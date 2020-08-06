import { BoardGame, BoardGameWithPrivateInfo, Collection } from './types'

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

export function isBoardgameWithPrivateInfo(item: BoardGame): item is BoardGameWithPrivateInfo {
  return 'privateinfo' in item
}

export function pad(n: number | string, width: number, z?: string) {
  z = z || '0'
  const s: string = n + ''
  return s.length >= width ? n : new Array(width - s.length + 1).join(z) + n
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}
