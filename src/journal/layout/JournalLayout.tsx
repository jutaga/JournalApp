import { Box, Toolbar } from "@mui/material"
import { Navbar, SideBar } from "../components";

interface PropJournalLayout {
    children: JSX.Element[]
}

const drawerWidth: number = 240;

export const JournalLayout = ({ children }: PropJournalLayout) => {
    return (
        <Box className='animate__animated animate__fadeIn animate__faster' sx={{ display: 'flex' }}>
            {/* Navbar drawerWidth */}
            <Navbar drawerWidth={drawerWidth} />

            {/* SideBar drawerWidth*/}
            <SideBar drawerWidth={drawerWidth} />

            <Box component='main' sx={{ flexGrow: 1, p: 3 }} >

                {/* Toolbar */}
                <Toolbar />
                {children}

            </Box>
        </Box>
    )
}
