import { ReactNode } from 'react';
import * as S from './styles';

type ColumnsProps = {
  title: string;
  children: ReactNode;
  type: 'REVIEW' | 'APPROVED' | 'REPROVED';
};

const Column = ({ title, children, type }: ColumnsProps) => {
  return (
    <S.Column type={type} key={title}>
      <>
        <S.TitleColumn type={type}>{title}</S.TitleColumn>
        <S.CollumContent>{children}</S.CollumContent>
      </>
    </S.Column>
  );
};
export default Column;
