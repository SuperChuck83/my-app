import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';


const AlertDialog: React.FunctionComponent<{openModal: boolean, handleCloseModal: Function, handleValidateModal: Function}> = (props) => {
  const intl = useIntl();
  const {openModal,handleCloseModal, handleValidateModal} = props; 

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    handleCloseModal();
  };

  const handleValidate = () => {
    handleValidateModal();
  }

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Supprimer cet élément ? 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            cet élément sera supprimé de la liste ...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleValidate} autoFocus>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default AlertDialog;
