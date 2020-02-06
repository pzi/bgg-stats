export interface PrivateInfoAttributes {
  pp_currency: string
  pricepaid: string
  cv_currency: string
  currvalue: string
  quantity: string
  acquisitiondate: string
  acquiredfrom: string
  inventorylocation: string
}

export interface Privateinfo {
  attrs: PrivateInfoAttributes
  privatecomment: string[]
}

export interface CollectionAttributes {
  totalitems: string
  termsofuse: string
  pubdate: string
}

export interface BoardGames {
  attrs: CollectionAttributes
  item: BoardGame[]
}

export interface Collection {
  items: BoardGames
}

export interface ItemAttributes {
  objecttype: string
  objectid: string
  subtype: string
  collid: string
}

export interface NameAttributes {
  sortindex: string
}

export interface Name {
  content: string
  attrs: NameAttributes
}

export interface StatusAttributes {
  own: string
  prevowned: string
  fortrade: string
  want: string
  wanttoplay: string
  wanttobuy: string
  wishlist: string
  preordered: string
  lastmodified: string
}

export interface Status {
  attrs: StatusAttributes
}

export interface BoardGame {
  attrs: ItemAttributes
  name: Name[]
  yearpublished: string[]
  image: string[]
  thumbnail: string[]
  status: Status[]
  numplays: string[]
}

export interface BoardGameWithPrivateInfo extends BoardGame {
  privateinfo: Privateinfo[]
  comment: string[]
}

export interface BoardGameValue {
  name: string
  paid?: number
}
