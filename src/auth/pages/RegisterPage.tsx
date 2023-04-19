import { Link as RouterLink } from 'react-router-dom'
import { Grid, TextField, Button, Typography, Link, Alert } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useFormRegister } from '../../hooks/useForm'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPasswords } from '../../store/auth/thunks'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
interface Errors {
  email: boolean,
  password: boolean,
  displayName: boolean
}

const errorsData: Errors = {
  email: false,
  password: false,
  displayName: false
}


const formData = {
  email: '',
  password: '',
  displayName: '',
}



export const RegisterPage = () => {

  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const { displayName, email, password, onInputChange, formState } = useFormRegister(formData);
  const [errorForm, setErrorForm] = useState(errorsData);

  const { status, errorMessage } = useSelector((state: RootState) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: Errors = {
      email: false,
      password: false,
      displayName: false
    };
    let hasError = false;

    if (displayName.trim() === '' || password.trim() === '' || email.trim() === '') {
      newErrors.displayName = displayName.trim() === '';
      newErrors.email = email.trim() === '';
      newErrors.password = password.trim() === '';
      hasError = true;

      setTimeout(() => {
        setErrorForm({
          email: false,
          password: false,
          displayName: false
        });
      }, 3000);
    } else {
      if (displayName.trim().length < 1) {
        newErrors.displayName = true;
        hasError = true;
      }

      if (!regex.test(email)) {
        newErrors.email = true;
        hasError = true;
      }

      if (password === '' || password.length <= 6) {
        newErrors.password = true;
        hasError = true;
      }
    }

    if (!hasError) {
      dispatch(startCreatingUserWithEmailPasswords(formState));
    }

    setErrorForm(newErrors);
  }
  return (
    <AuthLayout title='Crear Cuenta' >
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster' >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField autoComplete='off' error={errorForm['displayName']} helperText={errorForm['displayName'] && 'El nombre debe ser valido'} value={displayName} name='displayName' onChange={onInputChange} label='Nombre Completo' type="text" placeholder="Tu Nombre" fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField autoComplete='off' helperText={errorForm['email'] && 'El email debe ser valido'} error={errorForm['email']} value={email} name='email' onChange={onInputChange} label='Correo' type="email" placeholder="Correo@correo.com" fullWidth />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField helperText={errorForm['password'] && 'El password debe ser mayor a 6 Caracteres'} error={errorForm['password']} value={password} name='password' onChange={onInputChange} label='Contraseña' type="password" placeholder="Contraseña" fullWidth />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'} sx={{ mt: 2 }}>
              <Alert severity='error' >{errorMessage}</Alert>
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>Crear Cuenta</Button>
            </Grid>
          </Grid>

          <Grid container direction={'row'} justifyContent={'end'}>
            <Typography sx={{ mr: 1 }} >¿Ya tienes Cuenta?</Typography>
            <Link component={RouterLink} color={'inherit'} to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
