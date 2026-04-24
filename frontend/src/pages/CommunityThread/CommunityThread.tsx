import { useCallback, useEffect, useRef, useState } from "react";
import CommunityThreadView from "./CommunityThread.view";
import { useParams } from "react-router-dom";
import {
  FetchAllThreadsResponse,
  FetchThreadDetailResponse,
  PostThreadCommentResponse,
  Thread,
  ThreadComment,
} from "./CommunityThread.type";
import { toast } from "sonner";
import { FetchThreadContext } from "./CommunityThread.context";
import { useUser } from "@/components/Header/Header.context";

export default function CommunityThread() {
  const { user } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [thread, setThread] = useState<Thread | null>(null);
  const [threadsList, setThreadsList] = useState<Thread[]>([]);
  const [createCommentOpen, setCreateCommentOpen] = useState(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const safeThread = thread || ({} as Partial<Thread>);
  const comments = safeThread.thread_comments || ([] as ThreadComment[]);
  const safeThreadsList = threadsList || ([] as Thread[]);
  const params = useParams();

  const fetchThread = useCallback(async () => {
    setThread(null);
  }, [params.id]);

  const fetchAllThreads = async () => {
    setThreadsList([]);
  };

  const submitThread = async () => {
    setLoading(true);
    setError("");

    if (isNaN(parseInt(params.id || ""))) {
      return;
    }
    toast("Comment submitted");
    await fetchThread();
    setLoading(false);
    setCreateCommentOpen(false);
  };

  useEffect(() => {
    fetchThread();
  }, [fetchThread]);

  useEffect(() => {
    fetchAllThreads();
  }, []);

  document.title = `${
    thread ? thread.title : "Forum Komunitas"
  } - Mental Health App`;

  const setTextareaStatus = (value: boolean) => {
    setCreateCommentOpen(value);
  };

  useEffect(() => {
    if (createCommentOpen) {
      textarea.current?.focus();
    }
  }, [createCommentOpen]);

  return (
    <FetchThreadContext.Provider value={fetchThread}>
      <CommunityThreadView
        error={error}
        loading={loading}
        submitThread={submitThread}
        threadsList={threadsList}
        thread={thread}
        textareaRef={textarea}
        createCommentOpen={createCommentOpen}
        setTextareaStatus={setTextareaStatus}
        safeThread={safeThread}
        comments={comments}
        safeThreadsList={safeThreadsList}
        loggedIn={user}
      />
    </FetchThreadContext.Provider>
  );
}
