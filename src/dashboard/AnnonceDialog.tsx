import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useIntl } from "react-intl";
import {
  acte,
  bodacRecords,
  jugementData,
  listeetablissements,
  adresse,
} from "../domain/bodacRequest";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";

export enum EnumTypeAnnonce {
  jugement = 1,
}

const AnnonceDialog: React.FunctionComponent<{
  openModal: boolean;
  handleCloseModal: Function;
  selectedAnnonce: bodacRecords;
  type?: EnumTypeAnnonce;
}> = (props) => {
  const intl = useIntl();
  const { openModal, handleCloseModal, selectedAnnonce, type } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    handleCloseModal();
  };

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const jugement: jugementData = JSON.parse(
    selectedAnnonce.fields.jugement ?? null
  );

  const acte: acte = JSON.parse(selectedAnnonce.fields.acte ?? null);

  const listeetablissements: listeetablissements = JSON.parse(
    selectedAnnonce.fields.listeetablissements ?? null
  );

  debugger;

  const getAdresse = (adresse: adresse) => {
    if (adresse) {
      return (
        adresse.numeroVoie +
        " " +
        adresse.typeVoie +
        " " +
        adresse.nomVoie +
        " " +
        adresse.ville +
        " " +
        adresse.codePostal +
        " " +
        adresse.complGeographique +
        " " +
        (adresse.pays ?? "")
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Information sur l'annonce
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {jugement && (
            <>
              <Typography color="GrayText" variant="h6">
                {jugement.nature}
              </Typography>

              <Typography color="GrayText" variant="body2">
                {jugement.complementJugement}
              </Typography>
            </>
          )}

          {acte && (
            <>
              <Box width="100%">
                <Typography color="GrayText" variant="body1">
                  {acte.immatriculation?.categorieImmatriculation}
                </Typography>
                <Typography color="GrayText" variant="body1">
                  {acte.creation?.categorieCreation}
                </Typography>
              </Box>

              <Grid
                container
                justifyContent="space-between"
                width="100%"
                pt={1}
              >
                <Grid item>
                  <Typography
                    color="GrayText"
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                  >
                    Immatriculation
                  </Typography>

                  <Typography
                    color="GrayText"
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                  >
                    <Chip
                      label={moment(acte.dateImmatriculation).format(
                        "DD MM YYYY"
                      )}
                      variant="outlined"
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    color="GrayText"
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                  >
                    Commencement activité
                  </Typography>

                  <Typography
                    color="GrayText"
                    variant="body2"
                    sx={{ fontWeight: "bold", textAlign: "right" }}
                  >
                    <Chip
                      label={moment(acte.dateCommencementActivite).format(
                        "DD MM YYYY"
                      )}
                      variant="outlined"
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Box pt={2}>
                <Typography color="GrayText" variant="caption">
                  {acte.descriptif}
                </Typography>
              </Box>
            </>
          )}

          {listeetablissements && (
            <>
              {listeetablissements.etablissement.qualiteEtablissement && (
                <Typography color="GrayText" variant="body2">
                  {listeetablissements.etablissement.qualiteEtablissement}
                  <Tooltip
                    title={getAdresse(
                      listeetablissements.etablissement.adresse
                    )}
                  >
                    <IconButton aria-label="adress">
                      <FmdGoodRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
              )}

              <Box pt={1}>
                <Typography
                  color="GrayText"
                  variant="body2"
                  sx={{ fontWeight: "bold" }}
                >
                  activité
                </Typography>

                <Typography color="GrayText" variant="body2">
                  {listeetablissements.etablissement.activite}
                </Typography>
              </Box>

              {listeetablissements.etablissement.origineFonds && (
                <Box pt={1}>
                  <Typography
                    color="GrayText"
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                  >
                    origine des fonds
                  </Typography>

                  <Typography color="GrayText" variant="body2">
                    {listeetablissements.etablissement.origineFonds}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnnonceDialog;
