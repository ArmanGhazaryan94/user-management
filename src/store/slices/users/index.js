import createSliceWrapper from 'store/createSliceWrapper';
import data from 'users/users';

const initialState = {
  users: data.users,
};

const usersSlice = createSliceWrapper({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    setActive: (state, action) => {
      const { id, active } = action.payload;

      state.users = state.users.map(user => ({
        ...user,
        ...(user.id === id && { active }),
      }));
    },
    setSuperAdmin: (state, action) => {
      const { id, superAdmin } = action.payload;

      state.users = state.users.map(user => ({
        ...user,
        ...(user.id === id && { superAdmin }),
        permissions: user.permissions.map(permission => ({
          ...permission,
          active: superAdmin,
          subPermissions: permission.subPermissions.map(subPermission => ({
            ...subPermission,
            active: superAdmin
          }))
        }))
      }));
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;

      state.users = state.users.filter(({ id: userId }) => userId !== id);
    },

    updateUserInfo: (state, action) => {
      const updatedUserData = action.payload;

      state.users = state.users.map(user => ({
        ...user,
        info: {
          ...user.info,
          ...(updatedUserData.id === user.id && updatedUserData),
        },
      }));
    },
    setOnlyPermission: (state, action) => {
      const { id: permissionId, active, userId } = action.payload;

      state.users = state.users.map(user => {
        const { permissions, id } = user;

        if(userId !== id) return user;

        return {
          ...user,
          permissions: permissions.map(permission =>
            permission.id === permissionId
              ? {
                ...permission,
                active,
              }
              : permission,
          ),
        };
      });
    },
    setPermission: (state, action) => {
      const { id: permissionId, active, userId } = action.payload;

      state.users = state.users.map(user => {
        const { permissions, id } = user;

        if(userId !== id) return user;

        return {
          ...user,
          permissions: permissions.map(permission =>
            permission.id === permissionId
              ? {
                  ...permission,
                  subPermissions: permission.subPermissions.map(subPermission => ({
                    ...subPermission,
                    active,
                  })),
                  active,
                }
              : permission,
          ),
        };
      });
    },
    setSubPermission: (state, action) => {
      const { id: subPermissionId, active, userId } = action.payload;

      state.users = state.users.map(user => {
        const { permissions, id } = user;

        if(userId !== id) return user;

        return {
          ...user,
          permissions: permissions.map(permission => ({
            ...permission,
            subPermissions: permission.subPermissions.map(subPermission => ({
              ...subPermission,
              ...(subPermission.id === subPermissionId && {active})
            })),
          }))
        };
      });
    },
  },
});

const { actions, reducer } = usersSlice;

export const {
  setOnlyPermission,
  setSubPermission,
  updateUserInfo,
  setPermission,
  setSuperAdmin,
  deleteUser,
  setActive,
  addUser,
} = actions;

export default reducer;
