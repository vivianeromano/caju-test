import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { Dispatch } from 'react';

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  action: () => void;
};

const ActionModal = ({
  open,
  setOpen,
  title,
  description,
  action
}: ModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    action();
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Não
        </Button>
        <Button onClick={handleAction} color="primary">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
