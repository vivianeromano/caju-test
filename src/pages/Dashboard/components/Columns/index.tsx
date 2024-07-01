import * as S from './styles';
import RegistrationCard from '../RegistrationCard';
import { RegistrationGroupType } from '~/types/registrationType';
import Collumn from '../Column';

type CollumnsProps = {
  registrationGroup: RegistrationGroupType;
  removeRegistration: (id: string) => void;
};

const Collumns = ({ registrationGroup, removeRegistration }: CollumnsProps) => {
  return (
    <S.Container>
      <Collumn title="Pronto para revisar" type="REVIEW">
        {registrationGroup.REVIEW.map(registration => {
          return (
            <RegistrationCard
              removeRegistration={removeRegistration}
              data={registration}
              key={registration.id}
            />
          );
        })}
      </Collumn>
      <Collumn title="Aprovado" type="APPROVED">
        {registrationGroup.APPROVED.map(registration => (
          <RegistrationCard
            data={registration}
            key={registration.id}
            removeRegistration={removeRegistration}
          />
        ))}
      </Collumn>
      <Collumn title="Reprovado" type="REPROVED">
        {registrationGroup.REPROVED.map(registration => (
          <RegistrationCard
            data={registration}
            key={registration.id}
            removeRegistration={removeRegistration}
          />
        ))}
      </Collumn>
    </S.Container>
  );
};
export default Collumns;
