import createSliceWrapper from 'store/createSliceWrapper';

const initialState = {
  tableFilterValue: null
};

const filtersSlice = createSliceWrapper({
  name: 'filters',
  initialState,
  reducers: {
    setTableFilter: (state, action) => {
      state.tableFilterValue = action.payload
    }
  }
});

const { actions, reducer } = filtersSlice;

export const {
  setTableFilter
} = actions;

export default reducer;
