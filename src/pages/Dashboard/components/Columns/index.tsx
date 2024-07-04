import * as S from './styles';
import RegistrationCard from '../RegistrationCard';
import { RegistrationGroupType } from '~/types/registrationType';
import Column from '../Column';

type CollumnsProps = {
  registrationGroup: RegistrationGroupType;
};

const Collumns = ({ registrationGroup }: CollumnsProps) => {
  return (
    <S.Container>
      <Column title="Pronto para revisar" type="REVIEW">
        {registrationGroup.REVIEW.map(registration => {
          return <RegistrationCard data={registration} key={registration.id} />;
        })}
      </Column>
      <Column title="Aprovado" type="APPROVED">
        {registrationGroup.APPROVED.map(registration => (
          <RegistrationCard data={registration} key={registration.id} />
        ))}
      </Column>
      <Column title="Reprovado" type="REPROVED">
        {registrationGroup.REPROVED.map(registration => (
          <RegistrationCard data={registration} key={registration.id} />
        ))}
      </Column>
    </S.Container>
  );
};
export default Collumns;
