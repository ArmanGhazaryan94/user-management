import { useDispatch, useSelector } from 'react-redux';

import {Face as FaceIcon, Close as CloseIcon} from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  Dialog,
  Button,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { getUser } from 'store/selectors';
import { deleteUser } from 'store/actions';

function DeleteUserPopup({ closeDeletePopup, openDeletePopup, userId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => getUser(state, userId));

  const {
    info: { firstName, lastName },
    active,
  } = user;

  const handleDeleteUserButtonClick = () => {
    dispatch(deleteUser({ id: userId }));
    closeDeletePopup();
  };

  return (
    <Dialog onClose={closeDeletePopup} open={openDeletePopup}>
      <DialogTitle sx={{ ml: 10, mt: 8, mb: 4, width: 500 }}>
        <Typography variant="h2">Delete User</Typography>
        <IconButton
          aria-label="close"
          children={<CloseIcon />}
          onClick={closeDeletePopup}
          sx={{ top: 8, right: 8, position: 'absolute' }}
        />
      </DialogTitle>
      <DialogContent sx={{ padding: '0 64px' }}>
        <Grid item container sm={12} spacing={3}>
          <Grid container alignItems="center" item sm={1}>
            <FaceIcon fontSize="small" />
          </Grid>
          <Grid item sm={7}>
            <Typography>
              {firstName} {lastName}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography color={active ? '#44A0D3' : '#F89797'}>
              {active ? 'Active' : 'Inactive'} User
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider sx={{ mx: 13, mt: 5 }} />
      <DialogActions sx={{ width: 500 }}>
        <Box ml={12} my={6} width="100%" display="flex">
          <Button
            type="submit"
            color="warning"
            variant="contained"
            children="Delete User"
            sx={{ borderRadius: '16px', backgroundColor: '#f79696', textTransform: 'unset' }}
            onClick={handleDeleteUserButtonClick}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserPopup;
