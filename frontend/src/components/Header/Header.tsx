import { publicRoutes } from "@/viewports/Navigator/Navigator.data";
import HeaderView from "./Header.view";
import { profileDropdownItems } from "./Header.data";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "./Header.context";

export default function Header() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [mobileOpen, mobileSetOpen] = useState(false);
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("mental-jwt-token");
      localStorage.removeItem("mental-jwt-refresh-token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeaderView
      handleLogout={handleLogout}
      user={user}
      mobileOpen={mobileOpen}
      mobileSetOpen={mobileSetOpen}
      profileDropdownItems={profileDropdownItems}
      publicRoutes={publicRoutes}
    />
  );
}
