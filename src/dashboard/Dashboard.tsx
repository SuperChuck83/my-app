import { Box, Grid } from '@mui/material';
import React from 'react';
import BodacSearcher from './BodacSearcher';

const Dashboard: React.FunctionComponent<{}> = () => {

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={2} alignItems="center" >
        <Grid item xs={12} width="100%">
          <BodacSearcher />
        </Grid>
      </Grid>
      
    </Box>
  );
}

export default Dashboard;
