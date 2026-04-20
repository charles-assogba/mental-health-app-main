import { RouteItem } from "@/viewports/Navigator/Navigator.type";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface HeaderProps {
  user: User | null;
  publicRoutes: RouteItem[];
  profileDropdownItems: DropdownItems[];
  mobileSetOpen: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  handleLogout: () => void;
}

export interface DropdownItems {
  label: string;
  to: string;
}

export interface CheckUserResponse {
  msg: string;
  payload: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  username: string;
  phone_number: null;
  bio: null | string;
  gender: null | string;
  street: null | string;
  province: null | string;
  postal: null | string;
  country: null | string;
  role: string;
  created_at: Date;
  iat: number;
}

export interface RefreshTokenResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  accessToken: string;
}

export interface UserUseState {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export interface UserProviderProps {
  children: ReactNode;
  initialValue?: null;
}
