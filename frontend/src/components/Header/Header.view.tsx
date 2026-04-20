import { FC } from "react";
import ApplicationLogo from "../ApplicationLogo/ApplicationLogo";
import { HeaderProps } from "./Header.type";
import { Link } from "react-router-dom";
// import { Bell } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileMenuTrigger from "../MobileMenuTrigger/MobileMenuTrigger";
import UserAvatar from "../UserAvatar/UserAvatar";

const HeaderView: FC<HeaderProps> = ({
  user,
  publicRoutes,
  mobileOpen,
  mobileSetOpen,
  profileDropdownItems,
  handleLogout,
}) => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <ApplicationLogo />
              <MobileMenuTrigger setOpen={mobileSetOpen} open={mobileOpen} />
            </div>
            <div
              className={`${
                mobileOpen ? "block" : "hidden"
              } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
            >
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                {publicRoutes.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center mt-4 lg:mt-0">
                {/* {user && (
                  <Button
                    variant={"ghost"}
                    className="bg-inherit"
                    aria-label="show notifications"
                  >
                    <Bell className="w-6 h-6" />
                  </Button>
                )}
 */}
                <ModeToggle />

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center cursor-pointer focus:outline-none"
                        aria-label="toggle profile dropdown"
                      >
                        <UserAvatar name={user.name} size="md" />
                        <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                          User name
                        </h3>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Hi {user.username} 👋
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {profileDropdownItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                          <DropdownMenuItem className="cursor-pointer">
                            {item.label}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                      <DropdownMenuItem
                        onClick={() => handleLogout()}
                        className="cursor-pointer text-red-500"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <Button className="cursor-pointer bg-blue-500 px-6 hover:bg-blue-400">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderView;
