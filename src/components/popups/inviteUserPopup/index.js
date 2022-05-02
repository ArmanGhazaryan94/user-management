import CloseIcon from '@mui/icons-material/Close';
import {Typography,Dialog, IconButton, DialogTitle } from '@mui/material'

import InviteUserForm from './inviteUserForm';

function InviteUserPopup({ isDialogOpen, handleClickClose }) {
  return (
    <Dialog onClose={handleClickClose} open={isDialogOpen}>
      <DialogTitle sx={{ ml: 10, mt: 8, mb: 4, width: 500 }}>
        <Typography variant='h2'>Invite New User</Typography>
        <IconButton
          aria-label="close"
          children={<CloseIcon />}
          onClick={handleClickClose}
          sx={{ top: 8, right: 8, position: 'absolute' }}
        />
      </DialogTitle>
      <InviteUserForm closeInviteUserPopup={handleClickClose} />
    </Dialog>
  );
}

export default InviteUserPopup;
