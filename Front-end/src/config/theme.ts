import { createTheme } from "@mui/material/styles";
import { Theme } from '@mui/material';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#000'
        },
    },
})
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4167B2'
    }
  }
});
export function getThemeByName(theme: string): Theme{
  return themeMap[theme];
}
const themeMap: { [key: string]: Theme } = {
  lightTheme,
  darkTheme
};