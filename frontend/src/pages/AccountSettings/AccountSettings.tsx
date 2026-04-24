import { useState } from "react";
import AccountSettingsView from "./AccountSettings.view";
import NotFound from "../NotFound/NotFound";
import { UserWithData } from "../Profile/Profile.type";

export default function AccountSettings() {
  const [userFound, setUserFound] = useState(true);
  const [user, setUser] = useState<UserWithData | null>(null);

  document.title = "Setelan Akun - Mental Health App";

  if (!userFound) {
    return <NotFound />;
  }

  return <AccountSettingsView user={user} />;
}
