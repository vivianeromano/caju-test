import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { validateCPF } from '~/utils/validate';
import formatCpf from '~/utils/formatCpf';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/app/store';
import { fetchRegistrations } from '~/features/registration/registrationSlice';

export const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const [cpf, setCpf] = useState('');

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  useEffect(() => {
    if (validateCPF(cpf)) {
      dispatch(fetchRegistrations(cpf));
    } else {
      dispatch(fetchRegistrations());
    }
  }, [cpf, dispatch]);

  return (
    <S.Container>
      <TextField
        value={formatCpf(cpf)}
        onChange={e => setCpf(e.target.value)}
        placeholder="Digite um CPF válido"
      />
      <S.Actions>
        <IconButton
          aria-label="refetch"
          onClick={() => {
            dispatch(fetchRegistrations());
          }}
        >
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
