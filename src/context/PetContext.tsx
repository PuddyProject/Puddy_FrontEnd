import { createContext, useContext, useEffect, useState } from 'react';
import { get } from 'utils';

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
    get({ endpoint: '/users/pets/detail' })
      .then((res) => {
        //TODO: 펫 등록 여부를 확인할 수 없어서 임시 사용중
        // ! 펫 정보 없으면 500 에러 날 거예요
        console.log('pet context', hasPet);
        if (res.data.data.age) {
          setHasPet(() => true);
        }
      })
      .catch((err) => {
        console.log(err, 'PetContext에서 에러 발생.');
      });
  }, [hasPet]);

  return <PetContext.Provider value={contextValue}>{children}</PetContext.Provider>;
};

export const usePet = () => {
  return useContext(PetContext);
};
