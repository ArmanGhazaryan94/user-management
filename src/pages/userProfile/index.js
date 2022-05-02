import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import { getUser } from 'store/selectors';

import Header from 'components/header';
import UserInfo from 'components/userInfo';
import UserDetails from 'components/userDetails';
import UserPermissions from 'components/userPermissions';

const UserProfile = () => {
  const { id: userId } = useParams();

  const user = useSelector(state => getUser(state, userId));

  if (!user) {
    return 'User not Exist';
  }

  const { id, active, info, superAdmin, permissions } = user;

  return (
    <>
      <Header title="User Setup" />
      <Container sx={{ my: 7 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <UserInfo active={active} info={info} />
          </Grid>
          <Grid item xs={4} display="flex" flexDirection="column" justifyContent="space-between">
            <UserDetails id={id} info={info} active={active} />
          </Grid>
          <Grid item xs={5} display="flex" flexDirection="column" justifyContent="space-between">
            <UserPermissions
              permissions={permissions}
              id={id}
              role={info.role}
              superAdmin={superAdmin}
              isUserActive={active}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
