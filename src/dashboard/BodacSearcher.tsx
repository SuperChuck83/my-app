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
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import React, { useMemo } from "react";
import { makeStyles } from "tss-react/mui";
import { useReadBodac } from "../datafetch/bodacStore";
import { bodacRequest, bodacRecords } from "../domain/bodacRequest";
import { EnumFamilleAvis_Lib } from "../domain/EnumFamilleAvis_Lib";
import { isSiretValid } from "../helper/GenericFunction";
import SavedSearchRoundedIcon from "@mui/icons-material/SavedSearchRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AlertDialog from "./AlertDialog";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AnnonceCard from "./AnnonceCard";

const useStyles = makeStyles()(() => ({
  siretListContainer: {
    overflow: "hidden",
    overflowX: "auto",
  },
  accordionSiret: {
    marginLeft: "16px",
    paddingBottom: "0px"
  }
}));

interface siretLocal {
  siret: string;
  nom: string;
}

//test
const BodacSearcher: React.FunctionComponent<{}> = () => {
  const { classes } = useStyles();
  const [result, setResult] = React.useState<bodacRecords[]>([]);
  const [allRecordNumber, setAllRecordNumber] = React.useState<number | undefined>(undefined);

  const [filterFamilleAvis, setfilterFamilleAvis] = React.useState<string>(); //"Procédures de conciliation"
  const localKey = "listSiretSearch";

  const AddElementInLocalStorage = (_siret: string) => {
    const ListElement: siretLocal[] =
      JSON.parse(localStorage.getItem(localKey) ?? "null") ?? [];
    const isSiretExist =
      ListElement.filter((x) => {
        return x.siret === _siret;
      }).length > 0;

    if (!isSiretExist) {
      ListElement.push({ siret: _siret, nom: "" });
    }
    //sauvegarde de la liste de siret
    localStorage.setItem(localKey, JSON.stringify(ListElement));
  };

  const UpdateElementNameInLocalStorage = (_siret: string, _nom: string) => {
    if (!_nom) {
      return;
    }

    const ListElement: siretLocal[] =
      JSON.parse(localStorage.getItem(localKey) ?? "null") ?? [];

    const newList = ListElement.map((x) => {
      if (x.siret === _siret && !x.nom) {
        x.nom = _nom;
      }
      return x;
    });

    localStorage.setItem(localKey, JSON.stringify(newList));
  };

  const DeleteElementInLocalStorage = (_siret: string) => {
    const ListElement: siretLocal[] =
      JSON.parse(localStorage.getItem(localKey) ?? "null") ?? [];
    const isSiretExist =
      ListElement.findIndex((x) => { return x.siret === _siret });
    debugger;
    if (isSiretExist !== -1) {
      //sauvegarde de la liste de siret
      ListElement.splice(isSiretExist, 1);
      localStorage.setItem(localKey, JSON.stringify(ListElement));
    }

  };


  const GetElementInLocalStorage = () => {
    const ListElement: siretLocal[] =
      JSON.parse(localStorage.getItem(localKey) ?? "null") ?? [];

    return ListElement;
  };

  const [listSiret, setListSiret] = React.useState<siretLocal[]>([]);

  const [callBodac] = useReadBodac("test");



  //=> click sur le bouton rechercher
  const onClickRechercher = async () => {
    if (SiretOnError) {
      return;
    }

    AddElementInLocalStorage(siret);

    const refine = {
      familleavis_lib: filterFamilleAvis !== "" ? filterFamilleAvis : undefined,
    };

    const response = await callBodac(siret, refine);

    if (response.status === 200) {
      const records = response.data.records;

      UpdateElementNameInLocalStorage(
        siret,
        records[0]?.fields?.commercant ?? ""
      );
      setListSiret(GetElementInLocalStorage());
      setResult(response.data.records);
      setAllRecordNumber(response.data.nhits);
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
    siret = siret.replace(/ /g, "").substring(0, 9);
    setSiret(siret);
  };


  const SiretOnError = useMemo(() => {
    return !isSiretValid(siret);
  }, [siret]);

  //=> click sur la croix d'une chips
  const [openModal, setOpenModal] = React.useState(false);
  const [siretToDelete, setSiretToDelete] = React.useState("");
  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleValidateModal = () => {
    setOpenModal(false);
    DeleteElementInLocalStorage(siretToDelete);
    setListSiret(GetElementInLocalStorage());
    setSiretToDelete("");
  }
  const onClickDeleteChips = async (siret: string) => {
    setSiretToDelete(siret);
    setOpenModal(true);
  }
  //click sur chips
  const [chipsFlag, setChipsFlag] = React.useState(0);
  const onClickChips = async (siret: string) => {
    setSiret(siret);
    setChipsFlag((prevalue) => { return prevalue + 1; });
  }
  React.useEffect(() => {
    if (chipsFlag > 0) {
      onClickRechercher();
    }
  }, [chipsFlag]);

  React.useEffect(() => {
    setListSiret(GetElementInLocalStorage());
  }, []);

  return (
    <Paper elevation={2}>
      <Box width="100%" minHeight="800px" padding={0}>
        <Box>
          <Accordion defaultExpanded elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Box height="20px">
                    <Typography color="GrayText" variant="caption">
                      <SavedSearchRoundedIcon />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography color="GrayText" variant="caption">
                    Sélectionner un siret déjà recherché
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionSiret}>
              <Grid
                container
                spacing={2}
                width={"100%"}
                className={classes.siretListContainer}
                wrap="nowrap"
                pb={2}
              >
                {listSiret.map((sire: siretLocal, index: number) => (
                  <Grid item key={index}>
                    <Chip
                      label={sire.nom + " - " + sire.siret}
                      variant="outlined"
                      onDelete={() => { onClickDeleteChips(sire.siret) }}
                      onClick={() => { onClickChips(sire.siret) }}
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Grid container justifyContent="space-between" spacing={2} padding={2}>
            <Grid item>
              <Grid container alignItems={"center"} justifyContent="space-between" spacing={2}>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="SIREN"
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 14 }}
                    onChange={onBlurSiret}
                    value={siret}
                    error={SiretOnError}
                    helperText={
                      SiretOnError ? (
                        <Box height="0px"> Siren invalide </Box>
                      ) : undefined
                    }
                  />
                </Grid>
                <Grid item>
                  <Box width="200px">

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
                        <MenuItem value="">Tous</MenuItem>
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
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={onClickRechercher}
                    disabled={SiretOnError || !siret}
                  >
                    Rechercher
                  </Button>
                  {/* 
              <Button variant="contained" onClick={onClickTest}>
                test
              </Button> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>

              <IconButton aria-label="next">
                <ArrowBackIosNewRoundedIcon />
              </IconButton>
              0 à 10 sur {allRecordNumber}
              <IconButton aria-label="next">
                <ArrowForwardIosRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        {/* tableau des elements  */}

        <Grid container spacing={2} paddingLeft={3} paddingRight={3} >

          {result.map((line: bodacRecords, index: number) => (
            <Grid item>
              <AnnonceCard Annonce={line} />
            </Grid>
          ))}


        </Grid>


      </Box>

      <AlertDialog openModal={openModal} handleCloseModal={handleCloseModal} handleValidateModal={handleValidateModal} />


    </Paper>
  );
};

export default BodacSearcher;
