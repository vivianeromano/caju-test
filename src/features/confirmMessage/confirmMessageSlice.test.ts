import confirmMessageReducer, {
  setOpenActionModal,
  setCloseActionModal,
  setToast,
  setCloseToast
} from './confirmMessageSlice';
import { ManageModal } from '~/types/modalType';
import { ManageToast, ToastType } from '~/types/toastType';
import { ActionType } from '~/types/modalType';

describe('confirmMessageSlice', () => {
  const initialState = {
    modal: {
      open: false,
      id: undefined,
      actionType: undefined as ActionType | undefined
    },
    toast: {
      openToast: false,
      typeToast: ToastType.WARNING,
      messageToast: ''
    }
  };

  it('should return the initial state', () => {
    expect(confirmMessageReducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should handle setOpenActionModal', () => {
    const modal: ManageModal = {
      open: false,
      id: '123',
      actionType: ActionType.REVIEW
    };
    const nextState = confirmMessageReducer(
      initialState,
      setOpenActionModal(modal)
    );
    expect(nextState.modal).toEqual({ ...modal, open: true });
  });

  it('should handle setCloseActionModal', () => {
    const modifiedState = {
      ...initialState,
      modal: { open: true, id: '123', actionType: ActionType.REVIEW }
    };
    const nextState = confirmMessageReducer(
      modifiedState,
      setCloseActionModal()
    );
    expect(nextState.modal).toEqual(initialState.modal);
  });

  it('should handle setToast', () => {
    const toast: ManageToast = {
      openToast: true,
      typeToast: ToastType.SUCCESS,
      messageToast: 'Test message'
    };
    const nextState = confirmMessageReducer(initialState, setToast(toast));
    expect(nextState.toast).toEqual(toast);
  });

  it('should handle setCloseToast', () => {
    const modifiedState = {
      ...initialState,
      toast: {
        openToast: true,
        typeToast: ToastType.SUCCESS,
        messageToast: 'Test message'
      }
    };
    const nextState = confirmMessageReducer(modifiedState, setCloseToast());
    expect(nextState.toast).toEqual(initialState.toast);
  });
});
