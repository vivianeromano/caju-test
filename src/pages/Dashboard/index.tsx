import { useEffect, useState } from 'react';
import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import {
  listRegistration,
  deleteRegistration
} from '~/services/registrationService';
import {
  RegistrationGroupType,
  initRegistrationGroupType
} from '~/types/registrationType';

const DashboardPage = () => {
  const [registrationGroup, setRegistrationGroup] =
    useState<RegistrationGroupType>(initRegistrationGroupType());

  const handleRegistration = () => {
    listRegistration()
      .then(data => {
        setRegistrationGroup(data);
      })
      .catch(error => {
        console.log('Error');
      });
  };

  const removeRegistration = (id: string) => {
    deleteRegistration(id)
      .then(() => {
        alert('OK');
        handleRegistration();
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleRegistration();
  }, []);

  return (
    <S.Container>
      <SearchBar />
      <Collumns
        registrationGroup={registrationGroup}
        removeRegistration={removeRegistration}
      />
    </S.Container>
  );
};
export default DashboardPage;
