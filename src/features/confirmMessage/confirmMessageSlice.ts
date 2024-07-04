import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ManageModal } from '~/types/modalType';
import { ManageToast, ToastType } from '~/types/toastType';

type ConfirmMessageState = {
  modal: ManageModal;
  toast: ManageToast;
};

const initialState: ConfirmMessageState = {
  modal: {
    open: false,
    id: undefined,
    actionType: undefined
  },
  toast: {
    openToast: false,
    typeToast: ToastType.WARNING,
    messageToast: ''
  }
};

const confirmMessageSlice = createSlice({
  name: 'confirmMessage',
  initialState,
  reducers: {
    setOpenActionModal: (state, action: PayloadAction<ManageModal>) => {
      state.modal = { ...action.payload, open: true };
    },
    setCloseActionModal: state => {
      state.modal = {
        open: false,
        actionType: undefined,
        id: undefined
      };
    },
    setToast: (state, action: PayloadAction<ManageToast>) => {
      state.toast = action.payload;
    }
  }
});

export const { setOpenActionModal, setCloseActionModal, setToast } =
  confirmMessageSlice.actions;

export default confirmMessageSlice.reducer;
