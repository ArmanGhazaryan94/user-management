export const getFilters = state => state.filters;
export const getUsers = state => state.users.users;
export const getUser = (state, id) => getUsers(state)?.find(({ id: userId }) => userId === id);
export const getTableFilterValue = (state) => getFilters(state).tableFilterValue || '';
