import { createContext, useState, useContext, FC } from "react";
import { User, UserProviderProps, UserUseState } from "./Header.type";

const UserContext = createContext<UserUseState | null>(null);

export const UserProvider: FC<UserProviderProps> = ({
  children,
  initialValue = null,
}) => {
  const [value, setValue] = useState<User | null>(initialValue);

  const contextValue: UserUseState = {
    user: value,
    setUser: setValue,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserUseState => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
