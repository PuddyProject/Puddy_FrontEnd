import React, { createContext, useContext, useEffect, useState } from 'react';

import { UserToken } from 'types/userTokenTypes';
import decodeJWT from 'utils/decodeJWT';

interface UserContextProps {
  token: string | null;
  decodedToken: UserToken | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setDecodedToken: React.Dispatch<React.SetStateAction<UserToken | null>>;
}

export const UserContext = createContext<UserContextProps>({
  token: null,
  decodedToken: null,
  setToken: () => {},
  setDecodedToken: () => {},
});

const TOKEN_KEY = 'userToken';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<UserToken | null>(null);

  const contextValue = {
    token,
    decodedToken,
    setToken,
    setDecodedToken,
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }

    if (token) {
      const decoded = decodeJWT(token);
      setDecodedToken(() => decoded);
    } else setDecodedToken(null);
  }, [token]);

  useEffect(() => {
    const watchedStorageToken = (e: StorageEvent) => {
      if (e.key !== TOKEN_KEY) return;

      const userToken = e.newValue;
      if (!userToken) {
        setToken(() => null);
        setDecodedToken(() => null);
      }
    };

    window.addEventListener('storage', watchedStorageToken);

    return () => {
      window.removeEventListener('storage', watchedStorageToken);
    };
  }, []);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
