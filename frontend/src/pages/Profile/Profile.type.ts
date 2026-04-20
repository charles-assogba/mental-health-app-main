export interface ProfileProps {
  user: UserWithData | null;
  isMine: boolean;
}

export interface GetUserResponse {
  msg: string;
  payload: UserWithData;
}

export interface UserWithData {
  id: number;
  name: string;
  email: string;
  username: string;
  phone_number: string;
  bio: string;
  gender: string;
  country: null;
  province: null;
  city: null;
  street: null;
  postal: null;
  role: string;
  created_at: Date;
  threads: Thread[];
  thread_comments: ThreadComment[];
}

export interface ThreadComment {
  id: number;
  owner_id: number;
  thread_id: number;
  body: string;
  role: string;
  created_at: Date;
}

export interface Thread {
  id: number;
  owner_id: number;
  title: string;
  body: string;
  created_at: Date;
}
