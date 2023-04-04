import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';

import { UserToken } from 'types/userTokenTypes';

interface UserContextProps {
  loggedInUser: UserToken | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<UserToken | null>>;
}

const UserContext = createContext<UserContextProps>({
  loggedInUser: null,
  setLoggedInUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<UserToken | null>(null);
  const { userDecodedToken } = useAuth();

  useEffect(() => {
    setLoggedInUser(() => userDecodedToken);
  }, [userDecodedToken]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  return useContext<UserContextProps>(UserContext);
};
