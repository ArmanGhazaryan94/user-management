import {memo, useCallback} from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  Typography,
  Switch,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import { setSuperAdmin } from 'store/actions';

import PermissionsGroup from './permissionsGroup';

function UserPermissions({ id, superAdmin, permissions, role, isUserActive }) {
  const dispatch = useDispatch();

  const handleSuperAdminSwitch = useCallback(
    ({target: {checked}}) => dispatch(setSuperAdmin({ id, superAdmin: checked })),
    [superAdmin, dispatch, id],
  );

  return (
    <Box pl={5}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography mb={4} sx={{ font: 'normal normal 600 36px/48px SegoeUISemibold' }}>
          Permissions
        </Typography>
        <Typography mb={4} sx={{ font: 'normal normal 300 16px/21px SegoeUILight' }}>
          {role}
        </Typography>
      </Box>
      {role === 'Admin' && (
        <>
          <ListItemButton sx={{ height: 71 }}>
            <ListItemIcon />
            <ListItemText primary="Super Admin" sx={{opacity: isUserActive ? 1: .3}}/>
            <Switch edge="end" checked={superAdmin} onChange={handleSuperAdminSwitch} disabled={!isUserActive}/>
          </ListItemButton>
          <Divider variant="inset" />
        </>
      )}
      <PermissionsGroup permissions={permissions} userId={id} isUserActive={isUserActive}/>
    </Box>
  );
}

export default memo(UserPermissions);
