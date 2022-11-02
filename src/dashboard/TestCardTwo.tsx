import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';


const TestCardTwo: React.FunctionComponent<{}> = () => {
  const intl = useIntl();

  return (

    <Box paddingBottom={5}>
      <Typography gutterBottom variant="h5" component="div">
        {intl.formatMessage({ id: 'Common.Bienvenue' })}
      </Typography>
      <Link href="https://www.google.com/"> <Typography variant="body2" color="text.primary">
        {intl.formatMessage({ id: 'Common.Bienvenue' })}
      </Typography></Link>
    </Box>
  );
}

export default TestCardTwo;
