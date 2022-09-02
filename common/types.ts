//O arquivo types.ts é uma especie de contrato entre o back-end e o front que vão trocar os mesmos tipos de dados.

export type ApiResponse = {
  msg: string;
  status: number;
  result?: Object;
};

export const HTTP_SUCCESS: ApiResponse = { msg: "SUCCESS", status: 200 };
export const HTTP_BAD_REQUEST: ApiResponse = {
  msg: "BAD REQUEST",
  status: 400,
};
export const HTTP_NOT_FOUND: ApiResponse = { msg: "NOT FOUND", status: 404 };
export const HTTP_ERROR: ApiResponse = { msg: "ERROR", status: 500 };

export declare type UserType = "normal" | "admin";

// Usamos name e pass para identificar um usuario, i.e, a combinação de nome e pass deve ser única!

export interface User {
  readonly id: string;
  name: string;
  password: string;
  type: UserType;
  cover: string;
  avatar: string;
}

export interface Comment {
  readonly id: CommentId;
  readonly authorInfo: Pick<User, "avatar" | "name" | "id">;
  content: string;
  likes: Like[];
  dislikes: Like[];
}

export declare type CommentId = string;
export declare type Like = string;

export interface News {
  readonly id: string;
  readonly authorId: string;
  cover: string;
  title: string;
  date: string;
  description: string;
  markdownText: string;
  edited: boolean;
  views: number;
  likes: Like[];
  comments: CommentId[];
  tags: string[];
}
