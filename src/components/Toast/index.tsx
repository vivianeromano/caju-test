import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Dispatch } from 'react';
import { ToastType } from '~/types/toastType';

type ToastProps = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  type: ToastType;
  message: string;
};

const Toast = ({ open, type, message, setOpen }: ToastProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
