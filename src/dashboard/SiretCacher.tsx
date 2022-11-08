import SavedSearchRoundedIcon from "@mui/icons-material/SavedSearchRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import React from "react";
import { bodacRecords } from "../domain/bodacRequest";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "tss-react/mui";
import { siretLocal } from "./BodacSearcher";
import DoNotDisturbRoundedIcon from "@mui/icons-material/DoNotDisturbRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
const useStyles = makeStyles()(() => ({
  siretListContainer: {
    overflow: "hidden",
    overflowX: "auto",
  },
  accordionSiret: {
    marginLeft: "16px",
    paddingBottom: "0px",
  },
}));

const SiretCacher: React.FunctionComponent<{
  onClickDeleteChips: (siret: string) => void;
  onClickChips: (siret: string) => void;
  listSiret: siretLocal[];
}> = (props) => {
  const { classes } = useStyles();
  const { onClickDeleteChips, onClickChips, listSiret } = props;

  const onClickTextField = (event: any) => {
    event.stopPropagation();
  };

  const [isSearchVisible, setIsSearchVisible] = React.useState<boolean>(false);
  const [searchString, setSearchString] = React.useState<string>("");

  return (
    <Accordion defaultExpanded={false} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container alignItems="center">
          <Grid item>
            <Box height="20px">
              <Typography color="primary" variant="caption">
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
          alignItems="center"
          pb={2}
        >
          {listSiret.length > 5 && (
            <>
              <Grid item>
                {isSearchVisible === false && (
                  <Tooltip
                    title={
                      "Rechercher un siret ou un nom dans la liste des sirets déjà recherché"
                    }
                  >
                    <IconButton onClick={() => {setIsSearchVisible(true)}}>
                      <SearchRoundedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                )}

                {isSearchVisible === true && (
                  <TextField
                    onClick={onClickTextField}
                    value={searchString}
                    onChange={(event: any) => {
                      setSearchString(event.target.value);
                    }}
                    id="outlined-basic"
                    label="Rechercher un siret ou un nom"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>
            </>
          )}
          {listSiret
            .filter((x) => {
              return (
                x.siret.includes(searchString) || x.nom.includes(searchString)
              );
            })
            .map((sire: siretLocal, index: number) => (
              <Grid item key={index}>
                <Chip
                  label={sire.nom + " - " + sire.siret}
                  variant="outlined"
                  onDelete={() => {
                    onClickDeleteChips(sire.siret);
                  }}
                  onClick={() => {
                    onClickChips(sire.siret);
                  }}
                />
              </Grid>
            ))}

          {listSiret.length === 0 && (
            <Box pl={3} sx={{ userSelect: "none" }}>
              <Grid container spacing={2}>
                <Grid item>
                  <DoNotDisturbRoundedIcon sx={{ color: "#ff9800" }} />
                </Grid>
                <Grid item>
                  <Typography color="GrayText" variant="caption">
                    Aucun résultat
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SiretCacher;
