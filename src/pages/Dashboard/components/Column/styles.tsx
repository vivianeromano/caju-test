import styled from 'styled-components';

const registrationTypeStyles: {
  [key in string]: { background: string; title: string };
} = {
  REVIEW: {
    background: '#FDF8E9',
    title: '#EFC24D'
  },
  APPROVED: {
    background: '#EEEEFD',
    title: '#4242DF'
  },
  REPROVED: {
    background: '#FBEDF6',
    title: '#CE2893'
  }
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

export const Column = styled.div<{ type: any }>`
  height: auto;
  background-color: ${({ type }) => registrationTypeStyles[type].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ type: any }>`
  margin: 0px;
  color: ${({ type }) => registrationTypeStyles[type].title};
  margin: 24px;
`;

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
