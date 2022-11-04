import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useMemo } from "react";
import { makeStyles } from "tss-react/mui";
import { useReadBodac } from "../datafetch/bodacStore";
import { bodacRequest, bodacRecords } from "../domain/bodacRequest";
import { EnumFamilleAvis_Lib } from "../domain/EnumFamilleAvis_Lib";
import { isSiretValid } from "../helper/GenericFunction";

const useStyles = makeStyles()(() => ({}));

interface siretLocal {
  siret: string;
  nom: string;
}

const BodacSearcher: React.FunctionComponent<{}> = () => {
  const { classes } = useStyles();
  const [result, setResult] = React.useState<bodacRecords[]>([]);

  const [filterFamilleAvis, setfilterFamilleAvis] = React.useState<string>(
    "Procédures de conciliation"
  );

  const AddElementInLocalStorage = (_siret: string) => {
    const ListElement: siretLocal[] =
      JSON.parse(localStorage.getItem(localKey) ?? "") ?? [];
    const isSiretExist =
      ListElement.filter((x) => {
        return x.siret === _siret;
      }).length > 0;

    if (!isSiretExist) {
      ListElement.push({ siret: _siret, nom: "" });
    }

    debugger;
    //sauvegarde de la liste de siret
    localStorage.setItem(localKey, JSON.stringify(ListElement));
  };

  const UpdateElementNameInLocalStorage = (_siret: string, _nom: string) => {
    if(!_nom)
    {
      return; 
    }

    const ListElement: siretLocal[] =
      JSON.parse(localStorage.getItem(localKey) ?? "") ?? [];

    const newList = ListElement.map((x) => {
      if (x.siret === _siret && !x.nom) {
        x.nom = _nom;
      }
      return x;
    });

    localStorage.setItem(localKey, JSON.stringify(newList));
  };

  const GetElementInLocalStorage = () => {
    const ListElement: siretLocal[] =
      JSON.parse(localStorage.getItem(localKey) ?? "") ?? [];
    return ListElement;
  };

  const [listSiret, setListSiret] = React.useState<siretLocal[]>([]);

  const [callBodac] = useReadBodac("test");

  const localKey = "listSiretSearch";


  //=> click sur le bouton rechercher 
  const onClickRechercher = async () => {
    if (SiretOnError) {
      return;
    }

    AddElementInLocalStorage(siret);

    const refine = {
      familleavis_lib : filterFamilleAvis !== "" ? filterFamilleAvis : undefined,
    }

    const response = await callBodac(siret, refine);

    if (response.status === 200) {
      const records = response.data.records;

      UpdateElementNameInLocalStorage(
        siret,
        records[0]?.fields?.commercant ?? ""
      );
      setListSiret(GetElementInLocalStorage());
      setResult(response.data.records);
      debugger;
    }
  };

  const onClickTest = async () => {
    const test = JSON.parse(localStorage.getItem("listSiretSearch") ?? "");
    debugger;
  };

  const [siret, setSiret] = React.useState<string>("");
  const onBlurSiret = (event: any) => {
    let siret = event.target.value;
    siret = siret.replace(/ /g, "").substring(0,9);
    setSiret(siret);
  };

  const SiretOnError = useMemo(() => {
    return !isSiretValid(siret);
  }, [siret]);

  React.useEffect(() => {
    setListSiret(GetElementInLocalStorage());
  }, []);

  return (
    <Paper elevation={2}>
      <Box width="100%" minHeight="800px" padding={3}>
        <Box pt={2}>
          <Grid container alignItems={"center"} spacing={2}>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="SIREN"
                variant="outlined"
                size="small"
                inputProps={{ maxLength: 14 }}
                onBlur={onBlurSiret}
                error={SiretOnError}
                helperText={
                  SiretOnError ? (
                    <Box height="0px"> Siren invalide </Box>
                  ) : undefined
                }
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={onClickRechercher}
                disabled={SiretOnError || !siret}
              >
                Rechercher
              </Button>

              <Button variant="contained" onClick={onClickTest}>
                test
              </Button>
              <Box>
                {listSiret.map((sire: siretLocal, index: number) => (
                  <Box key={index}>
                    <Chip
                      label={sire.nom + " - " + sire.siret}
                      variant="outlined"
                      onDelete={() => {}}
                    />
                  </Box>
                ))}
              </Box>

              <Box></Box>

              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" shrink>
                    Famille avis
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    notched
                    value={filterFamilleAvis}
                    label="Famille avis"
                    size="small"
                    onChange={(event: SelectChangeEvent) => {
                      setfilterFamilleAvis(event.target.value as string);
                    }}
                  >
                    <MenuItem value="">
                      Tous
                    </MenuItem>
                    {(
                      Object.keys(EnumFamilleAvis_Lib) as Array<
                        keyof typeof EnumFamilleAvis_Lib
                      >
                    ).map((element, key) => {
                      return (
                        <MenuItem value={EnumFamilleAvis_Lib[element]}>
                          {EnumFamilleAvis_Lib[element]}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
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
