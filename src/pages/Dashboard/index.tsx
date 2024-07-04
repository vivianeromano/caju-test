import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import ActionModal from '~/pages/Dashboard/components/ActionModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/app/store';
import { useEffect } from 'react';
import { fetchRegistrations } from '~/features/registration/registrationSlice';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const registrationGroup = useSelector(
    (state: RootState) => state.registrations.registrationGroup
  );

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrationGroup={registrationGroup} />
      <ActionModal
        title="Deseja executar essa ação?"
        description="Essa ação pode não ser reversível"
      />
    </S.Container>
  );
};
export default DashboardPage;
