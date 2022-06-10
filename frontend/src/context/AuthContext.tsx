import React, { createContext, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../redux/hook";

type IContextProps = {
  children: React.ReactNode;
};

interface authInterface {
  userEmail: string;
  password: string;
}

export const AuthContext = createContext<
  | { user: authInterface }
  | null
  | { setUser: Dispatch<SetStateAction<authInterface>> }
  | boolean
>(null);

export const AuthProvider = ({ children }: IContextProps) => {
  const statusLogin = useAppSelector((state) => state.shoesState.statusLogin);

  const [user, setUser] = React.useState<authInterface>({
    userEmail: "nguyenle171120",
    password: "password",
  });

  return (
    <AuthContext.Provider value={statusLogin}>{children}</AuthContext.Provider>
  );
};
