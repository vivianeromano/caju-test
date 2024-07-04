import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import TextField from '~/components/TextField';
import * as S from './styles';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import routes from '~/router/routes';
import formatCpf from '~/utils/formatCpf';
import { validationSchema } from '~/utils/validate';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/app/store';
import { saveRegistration } from '~/features/registration/registrationSlice';

const NewUserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      admissionDate: '',
      email: '',
      employeeName: '',
      cpf: ''
    },
    validationSchema,
    onSubmit: values => {
      dispatch(saveRegistration(values)).then(() => {
        goToHome();
      });
    }
  });

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.slice(0, 14).replace(/[^\d]/g, '');
    const formattedValue = formatCpf(cleanedValue);

    formik.setFieldValue('cpf', formattedValue);
  };

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.employeeName}
          placeholder="Nome"
          id="employeeName"
          type="text"
          label="Nome"
          error={formik.errors.employeeName}
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
          label="Email"
          type="email"
          id="email"
          error={formik.errors.email}
        />
        <TextField
          onChange={handleCpfChange}
          value={formik.values.cpf}
          placeholder="CPF"
          label="CPF"
          id="cpf"
          error={formik.errors.cpf}
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.admissionDate}
          label="Data de admissão"
          type="date"
          id="admissionDate"
          error={formik.errors.admissionDate}
        />
        <Button type="submit" onClick={formik.handleSubmit}>
          Cadastrar
        </Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
