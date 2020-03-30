export interface IAuthor {
  first_name: string;
  last_name: string;
  address: string;
  post_count: number;
  city: string;
  country: string;
  date_of_birth: string;
  gender: string;
  email: string;
  phone: string;
  date_created: string;
  id: number;
  years?: number;
}
export interface ICountAuthor {
  count: number;
}
export type IncludeFilter = Array<{ relation: string, scope?: RequestFilter }>;
export interface RequestFilter {
  // name of the column and sorting direction. E.g. `first_name ASC` */
  order: string;
  // amount of items to be skipped from the beginning */
  skip: number;
  // amount of items to be returned */
  limit: number;
  /* specify the relation you want to include. You can include as many as you want
  * E.g. if you are retrieving an author, you may want to get his posts and all the comments for each post.
  * To do it, provide following payload:
  * [ { relation: 'posts', scope: { include: { relation: 'comments' } } } ]
  */
  include?: IncludeFilter;
  /** where filter. being used internally by getAuthorsData util function, you don't have to provide it yourself */
  where?: any;
}
