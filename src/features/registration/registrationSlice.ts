import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  changeStatusRegistration,
  deleteRegistration,
  listRegistration,
  createRegistration
} from '~/services/registrationService';
import {
  initRegistrationGroupType,
  RegistrationCreateType,
  RegistrationGroupType,
  RegistrationStatus
} from '~/types/registrationType';
import { ToastType } from '~/types/toastType';
import {
  setOpenActionModal,
  setToast
} from '../confirmMessage/confirmMessageSlice';
import { ActionType } from '~/types/modalType';
type RegistrationState = {
  registrationGroup: RegistrationGroupType;
  loading: boolean;
  error: string | null;
};

type ConfirmActionPayload = {
  actionType: ActionType;
  id: string;
};

const initialState: RegistrationState = {
  registrationGroup: initRegistrationGroupType(),
  loading: false,
  error: null
};

export const fetchRegistrations = createAsyncThunk(
  'registrations/fetchRegistrations',
  async (cpf: string | undefined, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await listRegistration(cpf);
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError('Erro ao buscar registros'));
      throw error;
    }
  }
);

export const removeRegistration = createAsyncThunk(
  'registrations/removeRegistration',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await deleteRegistration(id);
      dispatch(fetchRegistrations());
      dispatch(
        setToast({
          openToast: true,
          typeToast: ToastType.SUCCESS,
          messageToast: 'Card removido com sucesso!'
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setToast({
          openToast: true,
          typeToast: ToastType.ERROR,
          messageToast: 'Erro ao remover o card!'
        })
      );
      dispatch(setError('Erro ao remover o card'));
    }
  }
);

export const saveRegistration = createAsyncThunk(
  'registrations/saveRegistration',
  async (newRegistration: RegistrationCreateType, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await createRegistration(newRegistration);
      dispatch(
        setToast({
          openToast: true,
          typeToast: ToastType.SUCCESS,
          messageToast: 'Card criado com sucesso!'
        })
      );
      dispatch(fetchRegistrations());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setToast({
          openToast: true,
          typeToast: ToastType.ERROR,
          messageToast: 'Erro ao criar o card!'
        })
      );
      dispatch(setError('Erro ao criar o card'));
    }
  }
);

export const changeStatus = createAsyncThunk(
  'registrations/changeStatus',
  async (
    { id, status }: { id: string; status: RegistrationStatus },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      await changeStatusRegistration(id, status);
      dispatch(
        setToast({
          openToast: true,
          typeToast: ToastType.SUCCESS,
          messageToast: 'Status do card alterado com sucesso!'
        })
      );
      dispatch(fetchRegistrations());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setToast({
          openToast: true,
          typeToast: ToastType.ERROR,
          messageToast: 'Erro ao alterar status do card!'
        })
      );
      dispatch(setError('Erro ao alterar status do card'));
    }
  }
);

export const confirmAndExecuteAction = createAsyncThunk(
  'registrations/confirmAndExecuteAction',
  async ({ actionType, id }: ConfirmActionPayload, { dispatch }) => {
    dispatch(
      setOpenActionModal({
        open: true,
        actionType,
        id
      })
    );
  }
);

const registrationSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegistrations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRegistrations.fulfilled,
        (state, action: PayloadAction<RegistrationGroupType>) => {
          state.registrationGroup = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch registrations';
      });
  }
});

export const { setLoading, setError, clearError } = registrationSlice.actions;

export default registrationSlice.reducer;
