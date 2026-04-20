interface ThreadOwner {
  id: string | number;
  name: string;
  avatar?: string;
}
interface ThreadComment {
  id: string | number /* ... */;
}
interface Thread {
  id: string | number;
  title: string;
  body: string;
  owner: ThreadOwner;
  thread_comments: ThreadComment[];
  created_at?: string | Date;
}

export interface ThreadCardProps {
  isFull?: boolean;
  data: Thread;

  handleDelete?: (threadId: string | number) => void;
  currentUserId?: string | number | null | undefined;
}
