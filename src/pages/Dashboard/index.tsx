import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useRegistration } from '~/contexts/RegistrationContext';
import ActionModal from '~/components/ActionModal';

const DashboardPage = () => {
  const { registrationGroup, openActionModal, setOpenActionModal, action } =
    useRegistration();

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrationGroup={registrationGroup} />
      <ActionModal
        open={openActionModal}
        setOpen={setOpenActionModal}
        title="Deseja executar essa ação?"
        description="Essa ação pode não ser reversivel"
        action={action}
      />
    </S.Container>
  );
};
export default DashboardPage;
