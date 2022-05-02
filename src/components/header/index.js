import { lazy, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Box, Fab, TextField, Typography } from '@mui/material';
import {
  Add as PlusIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

import { setTableFilter } from 'store/actions';
import {getTableFilterValue} from "store/selectors";
import WithSuspense from 'helpers/withSuspense';

const InviteUserPopup = WithSuspense(lazy(() => import('components/popups/inviteUserPopup')));

const Header = ({ title, isHomePage }) => {
  const dispatch = useDispatch();
  const tableFilterValue = useSelector(getTableFilterValue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const onFilterChange = useCallback(({ target: { value } }) => {
    dispatch(setTableFilter(value));
  }, []);

  const handleClickOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <Box sx={{ boxShadow: '0px 3px 6px #00000029', backgroundColor: '#fff', zIndex: 1000 }}>
      <Container sx={{ position: 'relative' }}>
        <Box height={210} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h2">{title}</Typography>
          {isHomePage ? (
            <Fab
              size="large"
              color="primary"
              sx={{ position: 'absolute', bottom: -36, left: 0 }}
              onClick={handleClickOpen}
            >
              <PlusIcon fontSize="large" />
            </Fab>
          ) : (
            <Fab size="large" color="inherit" sx={{ position: 'absolute', bottom: -36, left: 0 }}>
              <SettingsIcon fontSize="large" sx={{ color: '#FFF' }} />
            </Fab>
          )}
          {isHomePage && (
            <TextField
              sx={{
                width: '100%',
                maxWidth: 356,
                '& input::placeholder': {
                  fontStyle: 'italic',
                },
              }}
              value={tableFilterValue}
              onChange={onFilterChange}
              variant="standard"
              InputProps={{ endAdornment: <SearchIcon /> }}
              placeholder="Type to filter the table"
            />
          )}
        </Box>
        {isDialogOpen && (
          <InviteUserPopup isDialogOpen={isDialogOpen} handleClickClose={handleClickClose} />
        )}
      </Container>
    </Box>
  );
};
export default Header;
