import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/app/store';
import { setCloseToast } from '~/features/confirmMessage/confirmMessageSlice';

const Toast = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useSelector((state: RootState) => state.confirmMessage.toast);

  const handleClose = () => {
    dispatch(setCloseToast());
  };

  return (
    <Snackbar
      open={toast.openToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={toast.typeToast}>
        {toast.messageToast}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
