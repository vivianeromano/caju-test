import { ButtonSmall } from '~/components/Buttons';
import * as S from './styles';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash
} from 'react-icons/hi';
import { RegistrationStatus, RegistrationType } from '~/types/registrationType';
import { ActionType } from '~/types/modalType';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/app/store';
import { confirmAndExecuteAction } from '~/features/registration/registrationSlice';

type RegistrationCardProps = {
  data: RegistrationType;
};

const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

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
                dispatch(
                  confirmAndExecuteAction({
                    actionType: ActionType.REPROVE,
                    id: data.id
                  })
                );
              }}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => {
                dispatch(
                  confirmAndExecuteAction({
                    actionType: ActionType.APPROVE,
                    id: data.id
                  })
                );
              }}
            >
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => {
              dispatch(
                confirmAndExecuteAction({
                  actionType: ActionType.REVIEW,
                  id: data.id
                })
              );
            }}
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash
          onClick={() => {
            dispatch(
              confirmAndExecuteAction({
                actionType: ActionType.REMOVE,
                id: data.id
              })
            );
          }}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
