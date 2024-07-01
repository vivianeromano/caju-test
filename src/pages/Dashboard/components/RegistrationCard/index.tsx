import { ButtonSmall } from '~/components/Buttons';
import * as S from './styles';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash
} from 'react-icons/hi';
import { RegistrationType } from '~/types/registrationType';
import { useState } from 'react';
import Modal from '~/components/ActionModal';

type RegistrationCardProps = {
  data: RegistrationType;
  removeRegistration: (id: string) => void;
};

const RegistrationCard = ({
  data,
  removeRegistration
}: RegistrationCardProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
        <ButtonSmall bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
        <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
        <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>

        <HiOutlineTrash onClick={handleClickOpen} />
        <Modal
          open={open}
          setOpen={setOpen}
          title="TEST"
          description="Test"
          action={() => {
            removeRegistration(data.id);
          }}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
