import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {teal, yellow} from "@mui/material/colors";
import {dark} from "@mui/material/styles/createPalette";

const theme = createTheme(({
    palette: {
        primary: teal,
        secondary: yellow,
        mode: 'dark'
    }
}))

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>

    , document.getElementById('root'));
// App()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
