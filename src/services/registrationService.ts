import api from './api';
import {
  RegistrationGroupType,
  initRegistrationGroupType,
  RegistrationType,
  RegistrationStatus
} from '~/types/registrationType';

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

// TODO: Create erros on catch
export const listRegistration = async () => {
  return api
    .get<RegistrationType[]>('/registrations')
    .then(response => buildRegistrationGroup(response.data));
};

export const deleteRegistration = async (id: string) => {
  return api.delete(`/registrations/${id}`);
};

export const changeStatusRegistration = async (
  id: string,
  status: RegistrationStatus
) => api.patch(`/registrations/${id}`, { status });
