import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  adresse,
  bodacRecords,
  listepersonnes,
  modificationGen,
} from "../domain/bodacRequest";
import moment from "moment";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import AnnonceDialog from "./AnnonceDialog";

const AnnonceCard: React.FunctionComponent<{ Annonce: bodacRecords }> = (
  props
) => {
  const intl = useIntl();
  const { Annonce } = props;

  const listePersonne: listepersonnes = JSON.parse(
    Annonce.fields.listepersonnes
  );
  const modifGeneral: modificationGen = JSON.parse(
    Annonce.fields.modificationsgenerales ?? null
  );

  const getAdresse = () => {
    let adress: adresse | undefined = undefined;
    if (listePersonne.personne.adresseSiegeSocial) {
      adress = listePersonne.personne.adresseSiegeSocial;
    } else if (listePersonne.personne.adressePP) {
      adress = listePersonne.personne.adressePP;
    }
    if (adress) {
      return (
        (adress.numeroVoie ?? "") +
        " " +
        (adress.typeVoie ?? "") +
        " " +
        (adress.nomVoie ?? "") +
        " " +
        (adress.ville ?? "") +
        " " +
        (adress.codePostal ?? "") +
        " " +
        (adress.complGeographique ?? "") +
        " " +
        (adress.pays ?? "")
      );
    }
  };

  //=> click sur la croix d'une chips
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card sx={{ width: "375px" }}>
        <CardContent sx={{ minHeight: "245px" }}>
          <>
            <Grid
              container
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Grid item>
                <Chip
                  label={moment(Annonce.fields.dateparution).format(
                    "DD MM YYYY"
                  )}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Typography
                  color="GrayText"
                  variant="body2"
                  sx={{ fontWeight: "bold" }}
                >
                  {Annonce.fields.familleavis_lib}
                </Typography>
              </Grid>
            </Grid>

            <Box paddingY={2}>
              <Typography color="GrayText" variant="body2">
                {Annonce.fields.tribunal}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {modifGeneral && " - " + modifGeneral.descriptif}
              </Typography>
            </Box>

            <Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  {listePersonne.personne.typePersonne === "pm" ? (
                    <Tooltip title="Personne morale">
                      <PsychologyRoundedIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Personne physique">
                      <AccessibilityNewRoundedIcon />
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  {listePersonne.personne.typePersonne === "pm" ? (
                    <Typography
                      color="GrayText"
                      variant="body2"
                      sx={{ fontWeight: "bold" }}
                    >
                      {listePersonne.personne.denomination}
                    </Typography>
                  ) : (
                    <Typography
                      color="GrayText"
                      variant="body2"
                      sx={{ fontWeight: "bold" }}
                    >
                      {Annonce.fields.commercant}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Typography color="GrayText" variant="caption">
                    {listePersonne.personne.formeJuridique}
                  </Typography>
                </Grid>
                <Grid item>
                  {getAdresse() && (
                    <Tooltip title={getAdresse()}>
                      <IconButton aria-label="adress">
                        <FmdGoodRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </Box>

            {/* {listePersonne.personne.numeroImmatriculation.codeRCS} */}
            {/* 
            {listePersonne.personne.formeJuridique}
            {listePersonne.personne.numeroImmatriculation} */}
          </>
        </CardContent>
        <CardActions>
          <Grid container alignItems="center" justifyContent={"space-between"}>
            <Grid item>
              <Typography color="GrayText" variant="caption">
                {Annonce.fields.id}
              </Typography>
              {" - "}
              <Typography color="GrayText" variant="caption">
                {Annonce.fields.typeavis_lib}
              </Typography>
            </Grid>
            <Grid item>
              {Annonce.fields.jugement && (
                <Button
                  size="small"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Voir le jugement
                </Button>
              )}

              {(Annonce.fields.acte || Annonce.fields.radiationaurcs || Annonce.fields.listeetablissements  )   && (
                <Button
                  size="small"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Voir plus
                </Button>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      <AnnonceDialog
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        selectedAnnonce={Annonce}
      />
    </>
  );
};

export default AnnonceCard;
