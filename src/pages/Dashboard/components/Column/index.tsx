import { ReactNode } from 'react';
import * as S from './styles';

type CollumnsProps = {
  title: string;
  children: ReactNode;
  type: 'REVIEW' | 'APPROVED' | 'REPROVED';
};

const Collumn = ({ title, children, type }: CollumnsProps) => {
  return (
    <S.Column type={type} key={title}>
      <>
        <S.TitleColumn type={type}>{title}</S.TitleColumn>
        <S.CollumContent>{children}</S.CollumContent>
      </>
    </S.Column>
  );
};
export default Collumn;
