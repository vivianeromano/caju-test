import { ButtonSmall } from '~/components/Buttons';
import * as S from './styles';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash
} from 'react-icons/hi';
import { RegistrationStatus, RegistrationType } from '~/types/registrationType';
import { useRegistration } from '~/contexts/RegistrationContext';
import { ActionType } from '~/types/actionType';

type RegistrationCardProps = {
  data: RegistrationType;
};

const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const { confirmAction } = useRegistration();

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {data.status === RegistrationStatus.REVIEW ? (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={() => {
                confirmAction(ActionType.REPROVE, data.id);
              }}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => {
                confirmAction(ActionType.APPROVE, data.id);
              }}
            >
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => {
              confirmAction(ActionType.REVIEW, data.id);
            }}
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash
          onClick={() => {
            confirmAction(ActionType.REMOVE, data.id);
          }}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
