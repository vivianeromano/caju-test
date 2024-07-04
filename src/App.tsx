import Router from '~/router';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import store from './app/store';
import Toast from './components/Toast';

function App() {
  return (
    <Provider store={store}>
      <Toast />
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </Provider>
  );
}

export default App;
