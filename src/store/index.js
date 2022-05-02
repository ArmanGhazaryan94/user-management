import { configureStore } from '@reduxjs/toolkit';

import reducer from './slices';
import customMiddlewares from './middlewares';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
