import { Thread } from "@/pages/Community/Community.type";
import ThreadCardView from "./ThreadCard.view";
import { toast } from "sonner";

import { ThreadCardProps } from "./ThreadCard.type";
import { useUser } from "../Header/Header.context";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function ThreadCard({
  isFull,
  data,
  fetchThreads,
}: {
  isFull?: boolean;
  data: Thread;
  fetchThreads?: (page: number) => Promise<void>;
}) {
  const { user } = useUser();
  const currentUserId = user?.id;
  const [searchParams] = useSearchParams();
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const page = parseInt(pageParam || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const handleDeleteThread = async (threadId: string | number) => {
    toast.success("Thread berhasil dihapus.");
  };

  const viewProps: ThreadCardProps = {
    isFull,
    data,
    handleDelete: handleDeleteThread,
    currentUserId: currentUserId,
  };

  return <ThreadCardView {...viewProps} />;
}
