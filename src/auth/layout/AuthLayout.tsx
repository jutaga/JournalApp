import { Grid, Typography } from '@mui/material'

interface PropAuthLayout {
    children: JSX.Element,
    title: string
}

export const AuthLayout = ({ children, title = '' }: PropAuthLayout) => {
    return (

        <Grid container spacing={0} direction="column" alignItems={'center'} justifyContent={'center'} sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}>

            <Grid item className='box-shadow' xs={3} sx={{ backgroundColor: ' white', padding: 3, borderRadius: 2, width: {md: 450} }} >
                <Typography textAlign={'center'} variant='h5' sx={{ mb: 1 }}>{title}</Typography>

                {children}

            </Grid>
        </Grid>
    )
}
