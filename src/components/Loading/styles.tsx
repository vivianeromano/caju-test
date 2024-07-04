import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledLoading = styled(CircularProgress)`
  color: #ff5722;
`;
