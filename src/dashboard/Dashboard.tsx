import { Box, Grid } from '@mui/material';
import React from 'react';
import TestCard from './TestCard';
const Dashboard: React.FunctionComponent<{}> = () => {

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={2} alignItems="center" >
        <Grid item xs={12}>
          <TestCard />
        </Grid>
      </Grid>
     
    </Box>
  );
}

export default Dashboard;
