import { memo } from 'react';

import { Avatar, Box, Button, Typography } from '@mui/material';
import { VpnKey as KeyIcon } from '@mui/icons-material';

function UserInfo({ active, info: { firstName, lastName, email } }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box
        mb={2}
        sx={{
          position: 'relative',
        }}
      >
        <Avatar sx={{ width: '232px', height: '232px' }} />
        <Box
          sx={{
            width: '70px',
            height: '50px',
            transition: '0.3s',
            background: '#7E7EF1',
            borderRadius: '30px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #707070',
            position: 'absolute',
            bottom: 20,
            right: 0,
          }}
        >
          <KeyIcon />
        </Box>
      </Box>
      <Button sx={{ color: '#B0ACAC', visibility: active ? 'visible':'hidden' }}>upload a photo</Button>
      <Typography
        mt={3}
        mb={2}
        align="center"
        sx={{ font: 'normal normal 600 48px/48px SegoeUISemibold', opacity: active ? 1 : .3 }}
      >
        {`${firstName} ${lastName}`}
      </Typography>
      <Typography mb={7} align="center" sx={{ font: 'normal normal 300 16px/21px SegoeUILight', opacity: active ? 1 : .3 }}>
        {email}
      </Typography>
      {active && (
        <Button
          fullWidth
          variant="contained"
          children="Resend the invite"
          sx={{
            borderRadius: '100px',
            height: '60px',
            backgroundColor: '#7E7EF1',
            textTransform: 'unset',
            font: 'normal normal 600 16px/21px SegoeUI',
          }}
        />
      )}
    </Box>
  );
}

export default memo(UserInfo);
