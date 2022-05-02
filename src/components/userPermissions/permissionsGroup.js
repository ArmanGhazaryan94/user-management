import { useState, useCallback, memo, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import {
  Collapse,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Stack,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

import { setPermission } from 'store/actions';

import SubPermissions from './subPermissions';

function PermissionsGroup({ permissions, userId, isUserActive }) {
  const dispatch = useDispatch();

  const [expandedId, setExpandedId] = useState(permissions[0].id);

  const handleExpand = id => () => setExpandedId(id === expandedId ? null : id);

  const onPermissionChange = useCallback(
    id => event => {
      event.stopPropagation();
      const {
        target: { checked },
      } = event;

      dispatch(setPermission({ id, active: checked, userId }));
    },
    [],
  );

  return permissions.map(({ title, id: permissionId, active, subPermissions }) => (
    <Fragment key={permissionId}>
      <ListItemButton sx={{ height: 71 }}>
        <ListItemIcon onClick={handleExpand(permissionId)}>
          {expandedId === permissionId ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: isUserActive ? 1 : 0.3 }} />
        <Switch
          edge="end"
          checked={active}
          onChange={onPermissionChange(permissionId)}
          disabled={!isUserActive}
        />
      </ListItemButton>
      <Collapse in={expandedId === permissionId}>
        <Stack flexDirection="column" ml={9} mr={2} mb={2}>
          <SubPermissions
            userId={userId}
            permissionId={permissionId}
            subPermissions={subPermissions}
            isPermissionActive={active}
            isUserActive={isUserActive}
          />
        </Stack>
      </Collapse>
      <Divider variant="inset" />
    </Fragment>
  ));
}

export default memo(PermissionsGroup);
