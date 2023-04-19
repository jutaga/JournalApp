import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { startLogout } from "../../store/auth/thunks";
import { useAppDispatch } from "../../hooks/useDispatch";


interface NavbarProp {
    drawerWidth: number;
}

export const Navbar = ({ drawerWidth = 240 }: NavbarProp) => {

    const dispatch = useAppDispatch();

    const onLogOut = () => {
        dispatch(startLogout());
    }


    return (
        <AppBar position='fixed' sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
            <Toolbar>
                <IconButton color="inherit" edge='start' sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant='h6' noWrap component='div'>JournalApp</Typography>

                    <IconButton onClick={onLogOut} color='error'>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
