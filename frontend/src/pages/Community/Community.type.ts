import { User } from "@/components/Header/Header.type";


export interface CommunityProps {
  threads: Thread[];
  users: OmittedUser[];
  loggedIn: User | null;
  pagination: Pagination | null;
}

// thread
export interface FetchThreadResponse {
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

// user
export interface GetAllUserResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  users: OmittedUser[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
}

export interface OmittedUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone_number: null | string;
  bio: null | string;
  gender: null | string;
  country: null;
  province: null;
  city: null;
  street: null;
  postal: null;
  role: string;
  created_at: Date;
  _count: Count;
}

export interface Count {
  ai_conversations: number;
  threads: number;
  thread_comments: number;
  thread_comment_replies: number;
  verification_tokens: number;
  todos: number;
  MoodSubmission: number;
  MindfulSessions: number;
  ResetPasswordToken: number;
}
