import { createContext, useContext, useEffect, useState } from 'react';

interface PetContextProps {
  hasPet: boolean | null;
  setHasPet: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const PetContext = createContext<PetContextProps>({
  hasPet: false,
  setHasPet: () => {},
});

export const PetProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasPet, setHasPet] = useState<boolean | null>(null);

  const contextValue = {
    hasPet,
    setHasPet,
  };

  useEffect(() => {
    //TODO: hasPet 값 넣는 부분 필요 마이페이지로 시작해야 할듯.
  }, []);

  return <PetContext.Provider value={contextValue}>{children}</PetContext.Provider>;
};

export const usePet = () => {
  return useContext(PetContext);
};
