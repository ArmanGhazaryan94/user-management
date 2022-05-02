import { memo, useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";

import {Switch, Typography, Box} from "@mui/material";

import { setSubPermission, setOnlyPermission } from 'store/actions';

function SubPermissions({ subPermissions, userId, permissionId, isPermissionActive, isUserActive }) {
  const dispatch = useDispatch();

  const handlePermissionSwitch = useCallback(id => ({target: {checked}}) => {
    dispatch(setSubPermission({ id, active: checked, userId }));
  }, [subPermissions]);

  useEffect(() => {
    if(subPermissions.every(({active}) => active) && !isPermissionActive){
      dispatch(setOnlyPermission({ active: true, userId, id: permissionId }))
    } else if(subPermissions.some(({active}) => !active) && isPermissionActive){
      dispatch(setOnlyPermission({ active: false, userId, id: permissionId }))
    }
  }, [subPermissions])

  return subPermissions.map(({ id, title, active }) => (
        <Box display="flex" justifyContent="space-between" alignItems="center" key={id}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: active ? '#44A0D3' : '#FF0000',
                mr: 1,
                opacity: isUserActive ? 1: .3
              }}
            />
            <Typography sx={{fontWeight: active ? 600 : 300, opacity: isUserActive ? 1 : .3}}>{title}</Typography>
          </Box>
          <Switch edge="end" checked={active} onChange={handlePermissionSwitch(id)} disabled={!isUserActive}/>
        </Box>
  ));
}

export default memo(SubPermissions);
