import { Box, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';


const TestCardOne: React.FunctionComponent<{}> = () => {
  const intl = useIntl();

  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        {intl.formatMessage({ id: 'Common.Bienvenue' })}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {intl.formatMessage({ id: 'Common.RecherchezLesInformationsPourUnSiret' })}
      </Typography>
    </Box>
  );
}

export default TestCardOne;
