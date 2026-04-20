interface ReplyOwner {
  id: string | number;
  name: string;
  avatar?: string;
}
interface ThreadCommentReply {
  id: string | number;
  body: string;
  owner: ReplyOwner;
  created_at?: string | Date;
}

export interface ReplySectionProps {
  data: ThreadCommentReply;

  handleDelete?: (replyId: string | number) => void;
  currentUserId?: string | number | null | undefined;
}
