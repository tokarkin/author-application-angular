export interface IAuthorDetail {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  country: string;
  date_of_birth: string;
  gender: string;
  email: string;
  phone: string;
  date_created: string;
  id: number;
  posts?: IPost[];
}

export interface IPost {
  title: string;
  text: string;
  date_created: string;
  authorId: number;
  id: number;
  comments: IComment[];
  author?: IAuthorDetail;
}
export interface IComment {
  content: string;
  date_created: string;
  authorId: number;
  postId: number;
  id: number;
  author?: IAuthorDetail;
}
