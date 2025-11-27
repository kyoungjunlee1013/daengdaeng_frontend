// 전체페이지, MUI 관련 폰트를 하나로 만들기 위한 파일
import { createTheme } from "@mui/material";

export const theme = createTheme({

    typography: {
        
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