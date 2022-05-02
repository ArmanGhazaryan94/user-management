import { lazy, useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Container, Typography, Switch, Stack, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  VpnKey as KeyIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';

import { getTableFilterValue, getUsers } from 'store/selectors';
import { setActive } from 'store/actions';
import withSuspense from 'helpers/withSuspense';

import Pagination from './pagination';

const DeleteUserPopup = withSuspense(lazy(() => import('components/popups/deleteUserPopup')));

export default function UsersTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(getUsers);
  const tableFilterValue = useSelector(getTableFilterValue);
  const [deletedUserId, setDeletedUserId] = useState(false);

  const onToggleActive = useCallback(
    id =>
      ({ target: { checked } }) => {
        dispatch(setActive({ id, active: checked }));
      },
    [],
  );

  const closeDeletePopup = useCallback(() => {
    setDeletedUserId(null);
  }, []);

  const onDeleteUser = useCallback(
    id => () => {
      setDeletedUserId(id);
    },
    [],
  );

  const handleSettingsClick = useCallback(
    id => () => {
      navigate(`/user-profile/${id}`);
    },
    [],
  );

  const tableUsers = useMemo(
    () =>
      (tableFilterValue
        ? users.filter(({ info: { firstName, lastName, email } }) =>
            `${firstName} ${lastName} ${email}`
              .toLowerCase()
              .includes(tableFilterValue.toLowerCase()),
          )
        : users
      ).map(({ id, info, role, active }) => ({
        id,
        role,
        active,
        fullName: `${info.firstName} ${info.lastName}`,
        ...info,
      })),
    [tableFilterValue, users],
  );

  const columns = useMemo(
    () => [
      {
        headerName: '',
        field: 'avatar',
        sortable: false,
        align: 'center',
        renderCell: ({ row }) => (
          <ProfileIcon fontSize="large" sx={{ opacity: row.active ? 1 : 0.3 }} />
        ),
      },
      {
        headerName: 'USER',
        field: 'fullName',
        flex: 1,
        renderCell: ({ row }) => (
          <Box display="flex" flexDirection="column" sx={{ opacity: row.active ? 1 : 0.3 }}>
            <Typography sx={{ font: 'normal normal 600 16px/21px SegoeUI' }}>
              {row.firstName} {row.lastName}
            </Typography>
            <Typography sx={{ font: 'normal normal 300 16px/21px SegoeUI' }}>
              {row.email}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: 'ROLE',
        field: 'role',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: '48px',
                height: '32px',
                transition: '0.3s',
                background: row.role === 'Admin' && row.active ? '#7E7EF1' : 'transparent',
                borderRadius: '30px',
                color: row.active ? '#fff' : '#cacaca',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {row.role === 'Admin' && <KeyIcon />}
            </Box>
            <Typography
              sx={{ font: 'normal normal 600 16px/21px SegoeUI', opacity: row.active ? 1 : 0.3 }}
            >
              {row.role}
            </Typography>
          </Stack>
        ),
      },
      {
        headerName: 'STATUS',
        field: 'active',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) => (
          <Box display="flex" flexDirection="column">
            <Switch checked={row.active} onChange={onToggleActive(row.id)} />
          </Box>
        ),
      },
      {
        headerName: 'ACTIONS',
        field: 'actions',
        sortable: false,
        align: 'right',
        headerAlign: 'center',
        width: 100,
        renderCell: ({ row }) => (
          <Box display="flex" flexDirection="column">
            <Stack spacing={0.4} direction="row">
              {row.active && (
                <IconButton onClick={handleSettingsClick(row.id)}>
                  <SettingsIcon />
                </IconButton>
              )}
              <IconButton onClick={onDeleteUser(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ),
      },
    ],
    [],
  );

  return (
    <Container
      sx={{
        mt: '32px',
        height: 600,
        '& .MuiDataGrid-root': {
          border: 'none',
          '& [role="cell"]:first-of-type': { borderBottom: 'none' },
          '& .MuiDataGrid-columnSeparator': {
            visibility: 'hidden',
          },
        },
      }}
    >
      <DataGrid
        autoPageSize
        rowHeight={88}
        disableColumnMenu
        columns={columns}
        rows={tableUsers}
        disableSelectionOnClick
        components={{ Pagination }}
      />
      {deletedUserId && (
        <DeleteUserPopup
          userId={deletedUserId}
          openDeletePopup={!!deletedUserId}
          closeDeletePopup={closeDeletePopup}
        />
      )}
    </Container>
  );
}
