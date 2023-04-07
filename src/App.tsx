import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { createContext } from 'react';
import { useAuth } from 'hooks/useAuth';
import { initUserInfo } from 'utils/initialValues/userInfo';

export const UserInfo = createContext(initUserInfo);

import { UserProvider } from 'context/UserContext';
import { PetProvider } from 'context/PetContext';

function App() {
  const { decodedUserToken } = useAuth();
  const userInfo = decodedUserToken();

  return (
    <UserProvider>
      <PetProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PetProvider>
    </UserProvider>
  );
}

export default App;
