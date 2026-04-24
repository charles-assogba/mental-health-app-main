import { useState, useEffect } from "react";
import ProfileView from "./Profile.view";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { UserWithData } from "./Profile.type";

export default function Profile() {
  const [isMine, setIsMine] = useState(true);
  const [userFound, setUserFound] = useState(true);
  const [user, setUser] = useState<UserWithData | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      setIsMine(false);
      return;
    }
  }, [id]);

  document.title = "Profil - Mental Health App";

  if (!userFound) {
    return <NotFound />;
  }

  return <ProfileView isMine={isMine} user={user} />;
}
