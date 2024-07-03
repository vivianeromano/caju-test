import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch
} from 'react';
import { ToastType } from '~/types/toastType';

type ConfirmMessageContextProps = {
  openActionModal: boolean;
  setOpenActionModal: Dispatch<React.SetStateAction<boolean>>;
  action: Function;
  setAction: Dispatch<React.SetStateAction<Function>>;
  openToast: boolean;
  setOpenToast: Dispatch<React.SetStateAction<boolean>>;
  typeToast: ToastType;
  setTypeToast: Dispatch<React.SetStateAction<ToastType>>;
  messageToast: string;
  setMessageToast: Dispatch<React.SetStateAction<string>>;
};

const ConfirmMessageContext = createContext<
  ConfirmMessageContextProps | undefined
>(undefined);

export const ConfirmMessageProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [openActionModal, setOpenActionModal] = useState<boolean>(false);
  const [action, setAction] = useState<Function>(() => {});
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [typeToast, setTypeToast] = useState<ToastType>(ToastType.WARNING);
  const [messageToast, setMessageToast] = useState<string>('');

  return (
    <ConfirmMessageContext.Provider
      value={{
        openActionModal,
        setOpenActionModal,
        action,
        setAction,
        openToast,
        setOpenToast,
        typeToast,
        setTypeToast,
        messageToast,
        setMessageToast
      }}
    >
      {children}
    </ConfirmMessageContext.Provider>
  );
};

export const useConfirmMessage = (): ConfirmMessageContextProps => {
  const context = useContext(ConfirmMessageContext);
  if (!context) {
    throw new Error(
      'useConfirmMessage must be used within a ConfirmMessageProvider'
    );
  }
  return context;
};
