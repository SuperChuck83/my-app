import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { useReadBodac } from '../datafetch/bodacStore';


const TestCardOne: React.FunctionComponent<{}> = () => {
  const intl = useIntl();

  const [callBodac] = useReadBodac("test");

  const onClickRechercher = async () => {
    const response = await callBodac();
    debugger;
  }

  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        {intl.formatMessage({ id: 'Common.Bienvenue' })}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {intl.formatMessage({ id: 'Common.RecherchezLesInformationsPourUnSiret' })}
      </Typography>

      <Box pt={2}>
        <Grid container alignItems={"center"} spacing={2}> 
          <Grid item> 
            <TextField id="outlined-basic" label="Siret" variant="outlined" size='small' />
          </Grid>
          <Grid item> 
            <Button variant="contained" onClick={onClickRechercher}>Rechercher</Button>
          </Grid>
        </Grid>
       
       

      </Box> 
    </Box>
  );
}

export default TestCardOne;
