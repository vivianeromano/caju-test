import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useRegistration } from '~/contexts/RegistrationContext';
import ActionModal from '~/components/ActionModal';
import { useConfirmMessage } from '~/contexts/ConfirmMessageContext';

const DashboardPage = () => {
  const { registrationGroup } = useRegistration();
  const { action, openActionModal, setOpenActionModal } = useConfirmMessage();

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrationGroup={registrationGroup} />
      <ActionModal
        open={openActionModal}
        setOpen={setOpenActionModal}
        title="Deseja executar essa ação?"
        description="Essa ação pode não ser reversível"
        action={action}
      />
    </S.Container>
  );
};
export default DashboardPage;
