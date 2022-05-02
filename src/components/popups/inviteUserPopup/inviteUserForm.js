import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Typography, Grid, Button, DialogContent, DialogActions, Box } from '@mui/material';
import {
  Face as FaceIcon,
  VpnKey as KeyIcon,
  AlternateEmail as EmailIcon,
} from '@mui/icons-material';

import { addUser } from 'store/actions';
import { roles } from 'config/roles';
import resolvers from 'config/resolvers';
import { guid } from 'helpers/guid';
import generateDefaultPermissions from 'helpers/generateDefaultPermissions';

import FormInput from 'components/form/input';
import FormSelect from 'components/form/select';

function InviteUserForm({ closeInviteUserPopup }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: resolvers.createUser,
  });

  const onSubmit = values => {
    dispatch(
      addUser({
        id: guid(),
        active: true,
        superAdmin: false,
        info: {
          ...values,
          avatar: null,
        },
        permissions: generateDefaultPermissions(),
      }),
    );
    closeInviteUserPopup();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent sx={{ padding: '0 64px' }}>
        <Grid item container sm={12} spacing={3}>
          <Grid sx={{ mt: 1.5 }} container alignItems="center" item sm={1}>
            <FaceIcon fontSize="small" />
          </Grid>
          <Grid item sm={5.5}>
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              control={control}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
            />
          </Grid>
          <Grid item sm={5.5}>
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              control={control}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
            />
          </Grid>
          <Grid container item sm={12}>
            <Grid sx={{ mt: 1.5 }} container alignItems="center" item sm={1}>
              <EmailIcon fontSize="small" />
            </Grid>
            <Grid item sm={11}>
              <FormInput
                fullWidth
                type="email"
                name="email"
                label="Email"
                control={control}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            </Grid>
          </Grid>
          <Grid container item sm={12}>
            <Grid sx={{ mt: 1.5 }} container alignItems="center" item sm={1}>
              <KeyIcon fontSize="small" />
            </Grid>
            <Grid item sm={11}>
              <FormSelect
                fullWidth
                name="role"
                label="Role"
                options={roles}
                control={control}
                placeholder="Role"
                error={!!errors?.role}
                sx={{ m: 0, minWidth: 221 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ width: 500 }}>
        <Box ml={12} mt={6} mb={10} width="100%" display="flex" justifyContent="space-between">
          <Button
            type="submit"
            color="primary"
            disabled={!isValid}
            variant="contained"
            children="Send Invitation"
            sx={{ borderRadius: '16px', backgroundColor: '#44A0D3', textTransform: 'unset' }}
          />
          <Typography color={isValid ? '#44D36A' : '#F89797'} fontStyle='italic'>{isValid ? 'Good to go' : 'Fill in all the fields'}</Typography>
        </Box>
      </DialogActions>
    </form>
  );
}

export default InviteUserForm;
