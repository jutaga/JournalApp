import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { purpleTheme } from "./purpleTheme";

interface ThemeProp {
    children: JSX.Element
}

export const AppTheme = ({ children }: ThemeProp) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
