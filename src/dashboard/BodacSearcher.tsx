import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { useReadBodac } from "../datafetch/bodacStore";
import { bodacRequest, bodacRecords } from "../domain/bodacRequest";

const useStyles = makeStyles()(() => ({}));

const BodacSearcher: React.FunctionComponent<{}> = () => {
  const { classes } = useStyles();
  const [result, setResult] = React.useState<bodacRecords[]>([]);

  const [callBodac] = useReadBodac("test");

  const onClickRechercher = async () => {
    const response = await callBodac();

    if (response.status === 200) {
      const records = response.data.records;
      setResult(response.data.records);
      debugger;
    }
  };

  return (
    <Paper elevation={2}>
      <Box width="100%" minHeight="800px" padding={3}>
        <Box pt={2}>
          <Grid container alignItems={"center"} spacing={2}>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Siret"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={onClickRechercher}>
                Rechercher
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* tableau des elements  */}
        {result.map((line: bodacRecords, index: number) => (
          <Box key={index}>

            {line.fields.dateparution} {line.fields.familleavis_lib}


          </Box>
        ))}

      </Box>
    </Paper>
  );
};

export default BodacSearcher;
