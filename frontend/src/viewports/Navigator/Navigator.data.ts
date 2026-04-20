import { createElement, lazy } from "react";
import { RouteItem } from "./Navigator.type";

// public routes akan tampil di navbar
export const publicRoutes: RouteItem[] = [
  {
    label: "Home",
    path: "/",
    element: createElement(lazy(async () => await import("@/pages/Home"))),
  },
  {
    label: "About",
    path: "/about",
    element: createElement(lazy(async () => await import("@/pages/About"))),
  },
  {
    label: "AI Chatbot",
    path: "/ai-chatbot",
    element: createElement(lazy(async () => await import("@/pages/AIChatbot"))),
  },
  {
    label: "Community",
    path: "/community",
    element: createElement(lazy(async () => await import("@/pages/Community"))),
  },
];

// private tidak
export const privateRoutes: RouteItem[] = [
  {
    label: "Community",
    path: "/community/:id",
    element: createElement(
      lazy(async () => await import("@/pages/CommunityThread"))
    ),
  },
  {
    label: "Community",
    path: "/create-thread",
    element: createElement(
      lazy(async () => await import("@/pages/CommunityForm"))
    ),
  },
  {
    label: "Login",
    path: "/login",
    element: createElement(lazy(async () => await import("@/pages/Login"))),
  },
  {
    label: "Register",
    path: "/register",
    element: createElement(lazy(async () => await import("@/pages/Register"))),
  },
  {
    label: "Profile",
    path: "/profile",
    element: createElement(lazy(async () => await import("@/pages/Profile"))),
  },
  {
    label: "Profile By Id",
    path: "/profile/:id",
    element: createElement(lazy(async () => await import("@/pages/Profile"))),
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    element: createElement(lazy(async () => await import("@/pages/Dashboard"))),
  },
  {
    label: "Account Settings",
    path: "/account-settings",
    element: createElement(
      lazy(async () => await import("@/pages/AccountSettings"))
    ),
  },
  {
    label: "Change Password",
    path: "/account-settings/change-password",
    element: createElement(
      lazy(async () => await import("@/pages/PasswordChange"))
    ),
  },
  {
    label: "Change Personal Info",
    path: "/account-settings/change-personal-info",
    element: createElement(
      lazy(async () => await import("@/pages/PersonalInfoChange"))
    ),
  },
  {
    label: "Change Address Info",
    path: "/account-settings/change-address-info",
    element: createElement(
      lazy(async () => await import("@/pages/AddressInfoChange"))
    ),
  },
  {
    label: "Verification",
    path: "/email-verify",
    element: createElement(
      lazy(async () => await import("@/pages/EmailVerification"))
    ),
  },
  {
    label: "Forgot Password",
    path: "/forgot-password",
    element: createElement(
      lazy(async () => await import("@/pages/ForgotPassword"))
    ),
  },
];
