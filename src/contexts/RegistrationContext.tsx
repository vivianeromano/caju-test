import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import {
  changeStatusRegistration,
  deleteRegistration,
  listRegistration,
  createRegistration
} from '~/services/registrationService';
import { ActionType } from '~/types/actionType';
import {
  initRegistrationGroupType,
  RegistrationCreateType,
  RegistrationGroupType,
  RegistrationStatus
} from '~/types/registrationType';
import { useConfirmMessage } from './ConfirmMessageContext';
import Toast from '~/components/Toast';
import { ToastType } from '~/types/toastType';

type RegistrationContextProps = {
  registrationGroup: RegistrationGroupType;
  fetchRegistrations: () => void;
  removeRegistration: (id: string) => void;
  changeStatus: (id: string, status: RegistrationStatus) => void;
  confirmAction: (actionType: ActionType, id: string) => void;
  saveRegistration: (newRegistration: RegistrationCreateType) => Promise<void>;
};

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined
);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationGroup, setRegistrationGroup] =
    useState<RegistrationGroupType>(initRegistrationGroupType());
  const {
    setOpenActionModal,
    setAction,
    openToast,
    setOpenToast,
    typeToast,
    setTypeToast,
    messageToast,
    setMessageToast
  } = useConfirmMessage();

  const fetchRegistrations = () => {
    listRegistration()
      .then(data => {
        setRegistrationGroup(data);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  const removeRegistration = (id: string) => () => {
    deleteRegistration(id)
      .then(() => {
        fetchRegistrations();
        setTypeToast(ToastType.SUCCESS);
        setMessageToast('Card removido com sucesso!');
        setOpenToast(true);
      })
      .catch(error => {
        console.log(error);
        setTypeToast(ToastType.ERROR);
        setMessageToast('Erro ao remover o card!');
        setOpenToast(true);
      });
  };

  const saveRegistration = (newRegistration: RegistrationCreateType) => {
    return createRegistration(newRegistration)
      .then(() => {
        setTypeToast(ToastType.SUCCESS);
        setMessageToast('Card criado com sucesso!');
        setOpenToast(true);
        fetchRegistrations();
      })
      .catch(error => {
        console.log(error);
        setTypeToast(ToastType.ERROR);
        setMessageToast('Erro ao criar o card!');
        setOpenToast(true);
      });
  };

  const changeStatus = (id: string, status: RegistrationStatus) => () => {
    changeStatusRegistration(id, status)
      .then(() => {
        setTypeToast(ToastType.SUCCESS);
        setMessageToast('Status do card alterado com sucesso!');
        setOpenToast(true);
        fetchRegistrations();
      })
      .catch(error => {
        setTypeToast(ToastType.ERROR);
        setMessageToast('Erro ao alterar status do card!');
        setOpenToast(true);
        console.log('error', error);
      });
  };

  const confirmAction = (actionType: ActionType, id: string) => {
    switch (actionType) {
      case ActionType.APPROVE:
        setAction(() => changeStatus(id, RegistrationStatus.APPROVED));
        setOpenActionModal(true);
        break;
      case ActionType.REMOVE:
        setAction(() => removeRegistration(id));
        setOpenActionModal(true);
        break;
      case ActionType.REVIEW:
        setAction(() => changeStatus(id, RegistrationStatus.REVIEW));
        setOpenActionModal(true);
        break;
      case ActionType.REPROVE:
        setAction(() => changeStatus(id, RegistrationStatus.REPROVED));
        setOpenActionModal(true);
        break;
      default:
        console.error('Type Invalid');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <>
      <Toast
        open={openToast}
        setOpen={setOpenToast}
        type={typeToast}
        message={messageToast}
      />
      <RegistrationContext.Provider
        value={{
          registrationGroup,
          fetchRegistrations,
          removeRegistration,
          changeStatus,
          confirmAction,
          saveRegistration
        }}
      >
        {children}
      </RegistrationContext.Provider>
    </>
  );
};

export const useRegistration = (): RegistrationContextProps => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      'useRegistration must be used within a RegistrationProvider'
    );
  }
  return context;
};
