import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store';
import routes from 'config/routes';
import generateRoutes from 'routes';
import ThemeProvider from 'theme/ThemeProvider';

import './index.css';

const App = () => (
  <ThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>{generateRoutes(routes)}</Routes>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

export default App;
