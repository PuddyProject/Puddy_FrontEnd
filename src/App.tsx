import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { UserProvider } from 'context/UserContext';
import { PetProvider } from 'context/PetContext';

function App() {
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
