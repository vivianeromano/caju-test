import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch
} from 'react';
import {
  changeStatusRegistration,
  deleteRegistration,
  listRegistration
} from '~/services/registrationService';
import { ActionType } from '~/types/actionType';
import {
  initRegistrationGroupType,
  RegistrationGroupType,
  RegistrationStatus
} from '~/types/registrationType';

type RegistrationContextProps = {
  registrationGroup: RegistrationGroupType;
  fetchRegistrations: () => void;
  removeRegistration: (id: string) => void;
  changeStatus: (id: string, status: RegistrationStatus) => void;
  openActionModal: boolean;
  setOpenActionModal: Dispatch<React.SetStateAction<boolean>>;
  action: any;
  confirmAction: (actionType: ActionType, id: string) => void;
};

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined
);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationGroup, setRegistrationGroup] =
    useState<RegistrationGroupType>(initRegistrationGroupType());

  const [openActionModal, setOpenActionModal] = useState<boolean>(false);

  const [action, setAction] = useState<any>(() => {});

  const fetchRegistrations = () => {
    listRegistration()
      .then(data => {
        setRegistrationGroup(data);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  const removeRegistration = (id: string) => {
    deleteRegistration(id)
      .then(() => {
        alert('OK');
        fetchRegistrations();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeStatus = (id: string, status: RegistrationStatus) => () => {
    changeStatusRegistration(id, status)
      .then(() => {
        fetchRegistrations();
      })
      .catch(error => {
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
    // setAction(action);
    // setOpenActionModal(true);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <RegistrationContext.Provider
      value={{
        registrationGroup,
        fetchRegistrations,
        removeRegistration,
        changeStatus,
        openActionModal,
        setOpenActionModal,
        action,
        confirmAction
      }}
    >
      {children}
    </RegistrationContext.Provider>
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
