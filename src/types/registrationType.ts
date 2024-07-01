export enum RegistrationStatus {
  APPROVED = 'APPROVED',
  REVIEW = 'REVIEW',
  REPROVED = 'REPROVED'
}

export interface RegistrationType {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
  id: string;
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
