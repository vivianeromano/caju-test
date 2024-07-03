export enum RegistrationStatus {
  APPROVED = 'APPROVED',
  REVIEW = 'REVIEW',
  REPROVED = 'REPROVED'
}

export interface RegistrationType extends RegistrationCreateType {
  id: string;
  status: RegistrationStatus;
}

export interface RegistrationCreateType {
  admissionDate: string;
  email: string;
  employeeName: string;
  cpf: string;
}

export interface RegistrationGroupType {
  [RegistrationStatus.APPROVED]: RegistrationType[];
  [RegistrationStatus.REVIEW]: RegistrationType[];
  [RegistrationStatus.REPROVED]: RegistrationType[];
}

export const initRegistrationGroupType = (): RegistrationGroupType => {
  return {
    [RegistrationStatus.REVIEW]: [],
    [RegistrationStatus.APPROVED]: [],
    [RegistrationStatus.REPROVED]: []
  };
};
