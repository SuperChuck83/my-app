import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { bodacRecords } from '../domain/bodacRequest';


const AnnonceCard: React.FunctionComponent<{ Annonce: bodacRecords }> = (props) => {
  const intl = useIntl();
  const { Annonce } = props;




  return (
    <>
      <Card sx={{ width: "275px" }}>
        <CardContent>
          {Annonce.fields.dateparution} {Annonce.fields.familleavis_lib} {Annonce.fields.id} {Annonce.fields.typeavis_lib} {Annonce.fields.tribunal}
          {/* {Annonce.fields.listepersonnes} */}  {Annonce.fields.jugement}
        </CardContent>
        <CardActions>
          <Button size="small">Voir plus</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default AnnonceCard;
