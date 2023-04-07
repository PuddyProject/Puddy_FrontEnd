import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { createContext } from 'react';
import { useAuth } from 'hooks/useAuth';
import { initUserInfo } from 'utils/initialValues/userInfo';

export const UserInfo = createContext(initUserInfo);

function App() {
  const { decodedUserToken } = useAuth();
  const userInfo = decodedUserToken();

  return (
    <UserInfo.Provider value={userInfo!}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserInfo.Provider>
  );
}

export default App;
