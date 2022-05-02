import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Stack, Grid, Switch, Typography } from '@mui/material';

import resolvers from 'config/resolvers';
import isEqual from 'helpers/isEqual';
import { setActive, updateUserInfo } from 'store/slices/users';

import FormInput from 'components/form/input';
import FormSelect from 'components/form/select';

import { roles } from 'config/roles';

function UserDetails({ id, active, info: { firstName, lastName, role } }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: resolvers.updateUser,
    defaultValues: {
      firstName,
      lastName,
      role,
    },
  });

  const values = getValues();
  const disabled = !isValid || isEqual(values, { firstName, lastName, role });

  const onSubmit = values => {
    dispatch(updateUserInfo({ id, ...values }));
    navigate('/');
  };

  const onToggleActive = useCallback(
    ({ target: { checked } }) => dispatch(setActive({ id, active: checked })),
    [id, dispatch],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid display="flex" flexDirection="column" justifyContent="space-between">
        <Box pl={10}>
          <Typography mb={4} sx={{ font: 'normal normal 600 36px/48px SegoeUISemibold' }}>
            Details
          </Typography>
          <Stack direction="column" spacing={4}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ width: 'calc(100% + 60px)', ml: '-60px' }}
            >
              <Switch checked={active} onChange={onToggleActive} />
              <Typography>
                The user is <b>{active ? 'Active' : 'Inactive'}</b>
              </Typography>
            </Box>
            <FormInput
              type="text"
              name="firstName"
              control={control}
              disabled={!active}
              label="First Name"
              defaultValue={firstName}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              disabled={!active}
              control={control}
              defaultValue={lastName}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
            />
            <FormSelect
              name="role"
              label="Role"
              options={roles}
              control={control}
              disabled={!active}
              placeholder="Role"
              defaultValue={role}
              error={!!errors?.role}
              sx={{ m: 0, minWidth: 221 }}
            />
          </Stack>
        </Box>
        {active && <Button
          variant="contained"
          type="submit"
          disabled={disabled}
          children='Save Changes'
          sx={{
            ml: 10,
            mt: 18,
            width: '200px',
            height: '60px',
            borderRadius: '100px',
            backgroundColor: '#44A0D3',
            textTransform: 'unset',
            font: 'normal normal 600 16px/21px SegoeUI',
          }}
        />}
      </Grid>
    </form>
  );
}

export default memo(UserDetails);
