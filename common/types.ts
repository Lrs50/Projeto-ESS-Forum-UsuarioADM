//O arquivo types.ts é uma especie de contrato entre o back-end e o front que vão trocar os mesmos tipos de dados.

export type ApiResponse = {
  msg: string;
  status: number;
  result?: Object;
};

export function createHTTPSuccessWithResult(result: Object): ApiResponse {
  return {
    msg: "SUCCESS",
    status: 200,
    result: result,
  } as ApiResponse;
}

export const HTTP_SUCCESS: ApiResponse = { msg: "SUCCESS", status: 200 };
export const HTTP_BAD_REQUEST: ApiResponse = {
  msg: "BAD REQUEST",
  status: 400,
};
export const HTTP_NOT_FOUND: ApiResponse = { msg: "NOT FOUND", status: 404 };
export const HTTP_ERROR: ApiResponse = { msg: "ERROR", status: 500 };

export declare type CommentId = string;
export declare type Like = string;

export declare type UserType = "User" | "Admin" | "Mod";

// Usamos name e pass para identificar um usuario, i.e, a combinação de nome e pass deve ser única!

export interface User {
  readonly id: string;
  username: string;
  name: string;
  aboutme: string;
  password: string;
  type: UserType;
  cover: string;
  avatar: string;
  profileComments: Comment[];
}

export function emptyUser(id: string): User {
  return {
    id: id,
    username: "",
    aboutme: "Change your about me!",
    name: "",
    password: "",
    type: "User",
    cover: "",
    avatar: "",
    profileComments: [],
  } as User;
}

export interface Comment {
  readonly id: CommentId;
  readonly authorInfo: Pick<User, "avatar" | "name" | "id">;
  content: string;
  likes: Like[];
  dislikes: Like[];
}

export function emptyComment(id: CommentId, authorId: string): Comment {
  return {
    id: id,
    authorInfo: {
      id: authorId,
      name: "",
      avatar: "",
    },
    content: "",
    likes: [],
    dislikes: [],
  } as Comment;
}

export interface News {
  readonly id: string;
  readonly authorId: string;
  cover: string;
  title: string;
  date: string;
  mention: string[];
  description: string;
  markdownText: string;
  edited: boolean;
  views: number;
  likes: Like[];
  comments: Comment[];
  tags: string[];
}

export function emptyNews(id: CommentId, authorId: string): News {
  return {
    id,
    authorId,
    mention: [],
    cover: "",
    title: "Change the title!",
    date: "",
    description: "Change the description!",
    markdownText: "",
    edited: false,
    views: 0,
    likes: [],
    comments: [],
    tags: [],
  } as News;
}

export declare type ArtistType = "Singer" | "Illustrator" | "Actor" | "Voice Actor" | "Writer";

export interface Artist {
  readonly id: string;
  type: ArtistType;
  name: string;
  description: string;
  mentions: number;
  cover: string;
}

export function emptyArtist(id: string): Artist {
  return {
    id: id,
    type: "Actor",
    description: "",
    name: "",
    mentions: 0,
    cover: "",
  } as Artist;
}

export const defaultTags: string[] = ["RAP", "TRAP", "POLEMIC", "INTERNACIONAL"];
