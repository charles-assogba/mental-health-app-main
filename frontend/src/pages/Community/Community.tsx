import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CommunityView from "./Community.view";
import {
  FetchThreadResponse,
  GetAllUserResponse,
  OmittedUser,
  Thread,
  Pagination,
} from "./Community.type";
import { toast } from "sonner";
import { useUser } from "@/components/Header/Header.context";

export default function Community() {
  const { user } = useUser();
  const [users, setUsers] = useState<OmittedUser[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [paginationData, setPaginationData] = useState<Pagination | null>(null);
  const [searchParams] = useSearchParams();
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const page = parseInt(pageParam || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const fetchThreads = async (page: number) => {
    setThreads([]);
    setPaginationData(null);
  };

  const fetchUsers = async () => {
    setUsers([]);
  };

  useEffect(() => {
    fetchThreads(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, []);

  document.title = "Forum Komunitas - Mental Health App";

  return (
    <CommunityView
      fetchThreads={fetchThreads}
      loggedIn={user}
      users={users}
      threads={threads}
      pagination={paginationData}
    />
  );
}
