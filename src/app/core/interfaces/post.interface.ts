export interface CommentInterface {
  id: number;
  text: string;
  createdDateTime: string;
  author: string;
}

export interface ResPostInterface {
  content: PostInterface[];
  totalElements: number;
}

export interface PostInterface {
  id: number;
  version?: number;
  text: string;
  createdDateTime: string;
  author: string;
  scope?: string;
  publicationDate?: string;
  status?: string;
  comments?: CommentInterface[];
}
