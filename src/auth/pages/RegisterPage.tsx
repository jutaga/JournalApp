import { Link as RouterLink } from 'react-router-dom'
import { Grid, TextField, Button, Typography, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useFormRegister } from '../../hooks/useForm'


const formData = {
  email: 'juanpablo@google.com',
  password: '123456',
  displayName: 'Juan pablo',
}

export const RegisterPage = () => {

  const { displayName, email, password, onInputChange } = useFormRegister(formData);

  return (
    <AuthLayout title='Crear Cuenta' >
      <form >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Nombre Completo' type="text" placeholder="Tu Nombre" fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Correo' type="email" placeholder="Correo@correo.com" fullWidth />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Contraseña' type="password" placeholder="Contraseña" fullWidth />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button variant='contained' fullWidth>Crear Cuenta</Button>
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
