import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { listRegistration } from '~/services/registrationService';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    handleRegistration();
  }, []);

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrationGroup={registrationGroup} />
    </S.Container>
  );
};
export default DashboardPage;
