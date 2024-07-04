import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/app/store';
import { setCloseActionModal } from '~/features/confirmMessage/confirmMessageSlice';
import {
  changeStatus,
  removeRegistration
} from '~/features/registration/registrationSlice';
import { ActionType } from '~/types/modalType';
import { RegistrationStatus } from '~/types/registrationType';

type ModalProps = {
  title: string;
  description: string;
};

const ActionModal = ({ title, description }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: RootState) => state.confirmMessage.modal);

  const handleClose = () => {
    dispatch(setCloseActionModal());
  };

  const handleAction = async () => {
    if (modal.id && modal.actionType !== undefined) {
      switch (modal.actionType) {
        case ActionType.APPROVE:
          await dispatch(
            changeStatus({ id: modal.id, status: RegistrationStatus.APPROVED })
          );
          break;
        case ActionType.REVIEW:
          await dispatch(
            changeStatus({ id: modal.id, status: RegistrationStatus.REVIEW })
          );
          break;
        case ActionType.REPROVE:
          await dispatch(
            changeStatus({ id: modal.id, status: RegistrationStatus.REPROVED })
          );
          break;
        case ActionType.REMOVE:
          await dispatch(removeRegistration(modal.id));
          break;

        default:
          console.error('Type Invalid');
      }
    }
    handleClose();
  };

  return (
    <Dialog
      open={modal.open}
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
