
import { AuthLayout } from '../layout/AuthLayout'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { chechingAuthentication, startGoogleSignIn } from '../../store/auth/thunks'
import { Google } from "@mui/icons-material"
import { Link as RouterLink } from 'react-router-dom'
import { RootState } from '../../store/store'
import { useAppDispatch } from '../../hooks/useDispatch'
import { useForm } from '../../hooks/useForm'
import { useMemo } from 'react'
import { useSelector } from 'react-redux';

export const LoginPage = () => {

  const { status } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch()

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const isAuthenticating = useMemo(() => status === 'cheking', [status]);

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(chechingAuthentication(email, password));
  }

  const onGoogleSignIn = () => {

    dispatch(startGoogleSignIn());

  }


  return (

    <AuthLayout title='Login' >
      <form onSubmit={onSubmit} >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField onChange={onInputChange} value={email} name='email' label='Correo' type="email" placeholder="Correo@correo.com" fullWidth />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField onChange={onInputChange} value={password} name='password' label='Contraseña' type="password" placeholder="Contraseña" fullWidth />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>Login</Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button disabled={isAuthenticating} onClick={onGoogleSignIn} variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }} >Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={'row'} justifyContent={'end'}>
            <Link component={RouterLink} color={'inherit'} to='/auth/register'>
              Crear una Cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>

  )
}
