import Router from '~/router';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import store from './app/store';
// import { RegistrationProvider } from '~/contexts/RegistrationContext';
// import { ConfirmMessageProvider } from './contexts/ConfirmMessageContext';

function App() {
  return (
    // <ConfirmMessageProvider>
    // <RegistrationProvider>
    <Provider store={store}>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </Provider>
    // </RegistrationProvider>
    // </ConfirmMessageProvider>
  );
}

export default App;
