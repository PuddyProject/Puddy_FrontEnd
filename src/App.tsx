import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

import { UserProvider } from 'context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
