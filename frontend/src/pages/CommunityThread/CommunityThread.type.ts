import { User } from "@/components/Header/Header.type";
import { RefObject } from "react";

export interface CommunityThreadProps {
  error: string;
  loading: boolean;
  submitThread: () => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  createCommentOpen: boolean;
  setTextareaStatus: (value: boolean) => void;
  thread: Thread | null;
  threadsList: Thread[];
  safeThread: Partial<Thread>;
  comments: ThreadComment[];
  safeThreadsList: Thread[];
  loggedIn: User | null;
}

export interface PostThreadCommentResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  id: number;
  owner_id: number;
  title: string;
  body: string;
}

export interface FetchAllThreadsResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  threads: Thread[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalThreads: number;
  limit: number;
}

export interface Thread {
  id: number;
  owner_id: number;
  title: string;
  body: string;
  created_at: Date;
  owner: Owner;
  thread_comments: ThreadComment[];
}

export interface Owner {
  id: number;
  name: Name;
  email: Email;
  username: Username;
  phone_number: Bio | null;
  bio: Bio | null;
  gender: Gender | null;
  country: null;
  province: null;
  city: null;
  street: null;
  postal: null;
  role: Role;
  created_at: Date;
}

export enum Bio {
  String = "string",
}

export enum Email {
  Aran8276FourthGmailCOM = "aran8276fourth@gmail.com",
  Aran8276GmailCOM = "aran8276@gmail.com",
  Zahranzn61GmailCOM = "zahranzn61@gmail.com",
}

export enum Gender {
  Male = "MALE",
}

export enum Name {
  Aa = "aa",
  HondaJazzGD3 = "Honda Jazz GD3",
  Zahran = "Zahran",
}

export enum Role {
  User = "USER",
}

export enum Username {
  Aran8276 = "aran8276",
  Jazzgd3 = "jazzgd3",
  Zahranzn61 = "zahranzn61",
}

export interface ThreadComment {
  id: number;
  owner_id: number;
  thread_id: number;
  body: string;
  role: Role;
  created_at: Date;
  owner: Owner;
  thread_comment_replies: ThreadCommentReply[];
}

export interface ThreadCommentReply {
  id: number;
  owner_id: number;
  comment_id: number;
  body: string;
  created_at: Date;
  owner: Owner;
}

export interface FetchThreadDetailResponse {
  msg: string;
  payload: Thread;
}

export interface Thread {
  id: number;
  owner_id: number;
  title: string;
  body: string;
  owner: Owner;
  thread_comments: ThreadComment[];
}

export interface ThreadCommentReply {
  id: number;
  owner_id: number;
  comment_id: number;
  body: string;
  owner: Owner;
}
