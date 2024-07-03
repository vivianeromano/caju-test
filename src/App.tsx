import Router from '~/router';
import { Header } from './components/Header';
import { RegistrationProvider } from '~/contexts/RegistrationContext';
import { ConfirmMessageProvider } from './contexts/ConfirmMessageContext';

function App() {
  return (
    <ConfirmMessageProvider>
      <RegistrationProvider>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </RegistrationProvider>
    </ConfirmMessageProvider>
  );
}

export default App;
