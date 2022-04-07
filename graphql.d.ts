/* tslint:disable */
/* eslint-disable */

declare module 'graphql' {
  export type IQueryFilter<T extends keyof IQuery> = Pick<IQuery, T>;
  export type IMutationFilter<T extends keyof IMutation> = Pick<IMutation, T>;

  export type IGraphQLResponseRoot = {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  };

  interface IGraphQLResponseError {
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  ////////////////////////////////////////////////////////////////////////////////
  export interface IQuery {
    me?: IUser;
    getUsers?: Array<IUser | null>;
    getUserById?: IUser;
    getRestaurants?: Array<IRestaurant | null>;
    getRestaurantById?: IRestaurant;
    ping?: string;
  }

  export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    photo?: string;
  }

  export interface IFilterUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  }

  export interface IFilterRestaurant {
    id?: string;
    name?: string;
    neighborhood?: string;
    address?: string;
    cuisine_type?: string;
    operating_hours?: IOperatingHoursInputFilter;
    reviews?: Array<IReviewInputFilter | null>;
    company?: string;
    latlng?: ILatLngInputFilter;
  }

  export interface IOperatingHoursInputFilter {
    Monday?: string;
    Tuesday?: string;
    Wednesday?: string;
    Thursday?: string;
    Friday?: string;
    Saturday?: string;
    Sunday?: string;
  }

  export interface IReviewInputFilter {
    user?: string;
    date?: string;
    rating?: number;
    comments?: string;
  }

  export interface ILatLngInputFilter {
    lat?: number;
    lng?: number;
  }

  export interface IRestaurant {
    id?: string;
    name?: string;
    neighborhood?: string;
    address?: string;
    photo?: string;
    cuisine_type?: string;
    operating_hours?: IOperatingHours;
    reviews?: Array<IReview | null>;
    company?: IUser;
    latlng?: ILatLng;
  }

  export interface IOperatingHours {
    Monday?: string;
    Tuesday?: string;
    Wednesday?: string;
    Thursday?: string;
    Friday?: string;
    Saturday?: string;
    Sunday?: string;
  }

  export interface IReview {
    user?: IUser;
    date?: string;
    rating?: number;
    comments?: string;
  }

  export interface ILatLng {
    lat?: number;
    lng?: number;
  }

  export interface IMutation {
    newUser?: IUser;
    updateUser?: IUser;
    login?: ITokenUser;
    newRestaurant?: IRestaurant;
    updateRestaurant?: IRestaurant;
    deleteRestaurant?: IRestaurant;
    pong?: string;
  }

  export interface IInputUser {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    photo?: string;
  }

  export interface IInputLogin {
    email: string;
    password: string;
  }

  export interface ITokenUser {
    token?: string;
  }

  export interface IInputRestaurant {
    name?: string;
    neighborhood?: string;
    address?: string;
    photo?: string;
    cuisine_type?: string;
    operating_hours?: IOperatingHoursInput;
    reviews?: Array<IReviewInput | null>;
    company?: string;
    latlng?: ILatLngInput;
  }

  export interface IOperatingHoursInput {
    Monday?: string;
    Tuesday?: string;
    Wednesday?: string;
    Thursday?: string;
    Friday?: string;
    Saturday?: string;
    Sunday?: string;
  }

  export interface IReviewInput {
    user?: string;
    date?: string;
    rating?: number;
    comments?: string;
  }

  export interface ILatLngInput {
    lat?: number;
    lng?: number;
  }

  /*********************************
   *                               *
   *         TYPE RESOLVERS        *
   *                               *
   *********************************/
  /**
   * This interface define the shape of your resolver
   * Note that this type is designed to be compatible with graphql-tools resolvers
   * However, you can still use other generated interfaces to make your resolver type-safed
   */
  export interface IResolver {
    Query?: IQueryTypeResolver;
    User?: IUserTypeResolver;
    Restaurant?: IRestaurantTypeResolver;
    OperatingHours?: IOperatingHoursTypeResolver;
    Review?: IReviewTypeResolver;
    LatLng?: ILatLngTypeResolver;
    Mutation?: IMutationTypeResolver;
    TokenUser?: ITokenUserTypeResolver;
  }
  export interface IQueryTypeResolver<TParent = any> {
    me?: QueryToMeResolver<TParent>;
    getUsers?: QueryToGetUsersResolver<TParent>;
    getUserById?: QueryToGetUserByIdResolver<TParent>;
    getRestaurants?: QueryToGetRestaurantsResolver<TParent>;
    getRestaurantById?: QueryToGetRestaurantByIdResolver<TParent>;
    ping?: QueryToPingResolver<TParent>;
  }

  export interface QueryToMeResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface QueryToGetUsersArgs {
    filter?: IFilterUser;
  }
  export interface QueryToGetUsersResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: QueryToGetUsersArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface QueryToGetUserByIdArgs {
    id: string;
  }
  export interface QueryToGetUserByIdResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: QueryToGetUserByIdArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface QueryToGetRestaurantsArgs {
    filter?: IFilterRestaurant;
  }
  export interface QueryToGetRestaurantsResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: QueryToGetRestaurantsArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface QueryToGetRestaurantByIdArgs {
    id: string;
  }
  export interface QueryToGetRestaurantByIdResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: QueryToGetRestaurantByIdArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface QueryToPingResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface IUserTypeResolver<TParent = any> {
    id?: UserToIdResolver<TParent>;
    name?: UserToNameResolver<TParent>;
    email?: UserToEmailResolver<TParent>;
    password?: UserToPasswordResolver<TParent>;
    role?: UserToRoleResolver<TParent>;
    photo?: UserToPhotoResolver<TParent>;
  }

  export interface UserToIdResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface UserToNameResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface UserToEmailResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface UserToPasswordResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface UserToRoleResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface UserToPhotoResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface IRestaurantTypeResolver<TParent = any> {
    id?: RestaurantToIdResolver<TParent>;
    name?: RestaurantToNameResolver<TParent>;
    neighborhood?: RestaurantToNeighborhoodResolver<TParent>;
    address?: RestaurantToAddressResolver<TParent>;
    photo?: RestaurantToPhotoResolver<TParent>;
    cuisine_type?: RestaurantToCuisine_typeResolver<TParent>;
    operating_hours?: RestaurantToOperating_hoursResolver<TParent>;
    reviews?: RestaurantToReviewsResolver<TParent>;
    company?: RestaurantToCompanyResolver<TParent>;
    latlng?: RestaurantToLatlngResolver<TParent>;
  }

  export interface RestaurantToIdResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToNameResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToNeighborhoodResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToAddressResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToPhotoResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToCuisine_typeResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToOperating_hoursResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToReviewsResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToCompanyResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface RestaurantToLatlngResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface IOperatingHoursTypeResolver<TParent = any> {
    Monday?: OperatingHoursToMondayResolver<TParent>;
    Tuesday?: OperatingHoursToTuesdayResolver<TParent>;
    Wednesday?: OperatingHoursToWednesdayResolver<TParent>;
    Thursday?: OperatingHoursToThursdayResolver<TParent>;
    Friday?: OperatingHoursToFridayResolver<TParent>;
    Saturday?: OperatingHoursToSaturdayResolver<TParent>;
    Sunday?: OperatingHoursToSundayResolver<TParent>;
  }

  export interface OperatingHoursToMondayResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface OperatingHoursToTuesdayResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface OperatingHoursToWednesdayResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface OperatingHoursToThursdayResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface OperatingHoursToFridayResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface OperatingHoursToSaturdayResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface OperatingHoursToSundayResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface IReviewTypeResolver<TParent = any> {
    user?: ReviewToUserResolver<TParent>;
    date?: ReviewToDateResolver<TParent>;
    rating?: ReviewToRatingResolver<TParent>;
    comments?: ReviewToCommentsResolver<TParent>;
  }

  export interface ReviewToUserResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface ReviewToDateResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface ReviewToRatingResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface ReviewToCommentsResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface ILatLngTypeResolver<TParent = any> {
    lat?: LatLngToLatResolver<TParent>;
    lng?: LatLngToLngResolver<TParent>;
  }

  export interface LatLngToLatResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface LatLngToLngResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface IMutationTypeResolver<TParent = any> {
    newUser?: MutationToNewUserResolver<TParent>;
    updateUser?: MutationToUpdateUserResolver<TParent>;
    login?: MutationToLoginResolver<TParent>;
    newRestaurant?: MutationToNewRestaurantResolver<TParent>;
    updateRestaurant?: MutationToUpdateRestaurantResolver<TParent>;
    deleteRestaurant?: MutationToDeleteRestaurantResolver<TParent>;
    pong?: MutationToPongResolver<TParent>;
  }

  export interface MutationToNewUserArgs {
    input?: IInputUser;
  }
  export interface MutationToNewUserResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: MutationToNewUserArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface MutationToUpdateUserArgs {
    id: string;
    input?: IInputUser;
  }
  export interface MutationToUpdateUserResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: MutationToUpdateUserArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface MutationToLoginArgs {
    input?: IInputLogin;
  }
  export interface MutationToLoginResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: MutationToLoginArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface MutationToNewRestaurantArgs {
    input?: IInputRestaurant;
  }
  export interface MutationToNewRestaurantResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: MutationToNewRestaurantArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface MutationToUpdateRestaurantArgs {
    id: string;
    input?: IInputRestaurant;
  }
  export interface MutationToUpdateRestaurantResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: MutationToUpdateRestaurantArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface MutationToDeleteRestaurantArgs {
    id: string;
  }
  export interface MutationToDeleteRestaurantResolver<
    TParent = any,
    TResult = any
  > {
    (
      parent: TParent,
      args: MutationToDeleteRestaurantArgs,
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface MutationToPongResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }

  export interface ITokenUserTypeResolver<TParent = any> {
    token?: TokenUserToTokenResolver<TParent>;
  }

  export interface TokenUserToTokenResolver<TParent = any, TResult = any> {
    (
      parent: TParent,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): TResult;
  }
}
