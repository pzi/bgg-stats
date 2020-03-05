export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Query = {
   __typename?: 'Query',
  getThingById?: Maybe<Thing>,
};


export type QueryGetThingByIdArgs = {
  id: Scalars['ID']
};

export type Thing = {
   __typename?: 'Thing',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

