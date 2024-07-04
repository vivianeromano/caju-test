import { cleanCPF } from '~/utils/validate';
import api from './api';
import {
  RegistrationGroupType,
  initRegistrationGroupType,
  RegistrationType,
  RegistrationStatus,
  RegistrationCreateType
} from '~/types/registrationType';
import { formatDate } from '~/utils/formatDate';

const buildRegistrationGroup = (
  registrations: RegistrationType[]
): RegistrationGroupType =>
  registrations.reduce(
    (acc, value) => ({
      ...acc,
      [value.status]: [...acc[value.status], value]
    }),
    initRegistrationGroupType()
  );

export const listRegistration = async (cpf?: string) => {
  return api
    .get<RegistrationType[]>(`/registrations?cpf=${cpf || ''}`)
    .then(response => buildRegistrationGroup(response.data));
};

export const deleteRegistration = async (id: string) => {
  return api.delete(`/registrations/${id}`);
};

export const changeStatusRegistration = async (
  id: string,
  status: RegistrationStatus
) => api.patch(`/registrations/${id}`, { status });

export const createRegistration = async (
  registrarion: RegistrationCreateType
) => {
  const data = {
    ...registrarion,
    cpf: cleanCPF(registrarion.cpf),
    admissionDate: formatDate(registrarion.admissionDate),
    status: RegistrationStatus.REVIEW
  };
  api.post<RegistrationType>('/registrations', data);
};
