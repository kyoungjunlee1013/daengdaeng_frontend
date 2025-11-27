import { createTheme } from "@mui/material";

export const theme = createTheme({

    typography: {
        //mui의 모든 폰트를 통일한다.
        fontFamily: '"Gowun Batang", serif',
    },
    palette: {
        primary: {
            main : '#ff7e36',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root:  {
                    fontWeight: 'bold',
                },
            },
        },
    },
});