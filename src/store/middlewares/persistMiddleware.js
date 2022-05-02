import { persistKeys } from 'config/persist';
import { __PERSIST__ } from 'constants/persist';
import { saveToLocalStorage } from 'helpers/localStorage';

const persistMiddleware =
  ({ getState }) =>
  next =>
  action => {
    next(action);

    const store = getState();
    const { type } = action;
    const [sliceName] = type.split('/');

    if (persistKeys.includes(sliceName) && store[sliceName]) {
      saveToLocalStorage(`${__PERSIST__}${sliceName}`, store[sliceName]);
    }
  };

export default persistMiddleware;
