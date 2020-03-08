import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type Link = {
   __typename?: 'Link',
  type: Linktype,
  id: Scalars['Int'],
  value: Scalars['String'],
  inbound?: Maybe<Scalars['Boolean']>,
};

export enum Linktype {
  Boardgameaccessory = 'boardgameaccessory',
  Boardgameartist = 'boardgameartist',
  Boardgamecategory = 'boardgamecategory',
  Boardgamecompilation = 'boardgamecompilation',
  Boardgamedesigner = 'boardgamedesigner',
  Boardgameexpansion = 'boardgameexpansion',
  Boardgamefamily = 'boardgamefamily',
  Boardgameimplementation = 'boardgameimplementation',
  Boardgamemechanic = 'boardgamemechanic',
  Boardgamepublisher = 'boardgamepublisher'
}

export type Name = {
   __typename?: 'Name',
  primary: Scalars['String'],
  alternate?: Maybe<Array<Scalars['String']>>,
};

export type Query = {
   __typename?: 'Query',
  getThingById?: Maybe<Thing>,
};


export type QueryGetThingByIdArgs = {
  id: Scalars['Int']
};

export type Thing = {
   __typename?: 'Thing',
  id: Scalars['Int'],
  type: Thingtype,
  name?: Maybe<Name>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  thumbnail?: Maybe<Scalars['String']>,
  yearpublished?: Maybe<Scalars['Int']>,
  minplayers?: Maybe<Scalars['Int']>,
  maxplayers?: Maybe<Scalars['Int']>,
  playingtime?: Maybe<Scalars['Int']>,
  minplaytime?: Maybe<Scalars['Int']>,
  maxplaytime?: Maybe<Scalars['Int']>,
  minage?: Maybe<Scalars['Int']>,
  link?: Maybe<Array<Maybe<Link>>>,
};

export enum Thingtype {
  Boardgame = 'boardgame',
  Boardgameexpansion = 'boardgameexpansion',
  Boardgameaccessory = 'boardgameaccessory',
  Videogame = 'videogame',
  Rpgitem = 'rpgitem',
  Rpgissue = 'rpgissue'
}


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Thing: ResolverTypeWrapper<Thing>,
  THINGTYPE: Thingtype,
  Name: ResolverTypeWrapper<Name>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Link: ResolverTypeWrapper<Link>,
  LINKTYPE: Linktype,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Int: Scalars['Int'],
  Thing: Thing,
  THINGTYPE: Thingtype,
  Name: Name,
  String: Scalars['String'],
  Link: Link,
  LINKTYPE: Linktype,
  Boolean: Scalars['Boolean'],
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
}>;

export type LinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = ResolversObject<{
  type?: Resolver<ResolversTypes['LINKTYPE'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  inbound?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type NameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Name'] = ResolversParentTypes['Name']> = ResolversObject<{
  primary?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  alternate?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getThingById?: Resolver<Maybe<ResolversTypes['Thing']>, ParentType, ContextType, RequireFields<QueryGetThingByIdArgs, 'id'>>,
}>;

export type ThingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thing'] = ResolversParentTypes['Thing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['THINGTYPE'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['Name']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  yearpublished?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  minplayers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  maxplayers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  playingtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  minplaytime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  maxplaytime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  minage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  link?: Resolver<Maybe<Array<Maybe<ResolversTypes['Link']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Link?: LinkResolvers<ContextType>,
  Name?: NameResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Thing?: ThingResolvers<ContextType>,
  Upload?: GraphQLScalarType,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
