import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AccountSettingsView from "./AccountSettings.view";
import NotFound from "../NotFound/NotFound";
import { GetUserResponse, UserWithData } from "../Profile/Profile.type";

export default function AccountSettings() {
  const [userFound, setUserFound] = useState(true);
  const [user, setUser] = useState<UserWithData | null>(null);

  const fetchUser = async () => {
    try {
      const data: GetUserResponse = (await client().get("/user")).data;
      setUser(data.payload);
    } catch (error) {
      setUser(null);
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.msg || "Gagal memuat data pengguna.";
        toast.error(errorMsg);
        console.error(
          "Fetch User Error:",
          error.response?.data || error.message
        );
        setUserFound(false);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  document.title = "Setelan Akun - Mental Health App";

  if (!userFound) {
    return <NotFound />;
  }

  return <AccountSettingsView user={user} />;
}
