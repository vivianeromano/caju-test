export enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface ManageToast {
  openToast: boolean;
  typeToast: ToastType;
  messageToast: string;
}
