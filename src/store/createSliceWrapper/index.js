import { createSlice } from '@reduxjs/toolkit';

import { persistKeys } from 'config/persist';
import { __PERSIST__ } from 'constants/persist';
import { getFromLocalStorage } from 'helpers/localStorage';

const createSliceWrapper = ({ name, initialState: defaultState, reducers, ...rest }) => {
  const initialState = persistKeys.includes(name)
    ? getFromLocalStorage(`${__PERSIST__}${name}`) ?? defaultState
    : defaultState;

  return createSlice({
    name,
    initialState,
    reducers,
    ...rest,
  });
};

export default createSliceWrapper;
