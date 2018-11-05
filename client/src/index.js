import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const customStyles = {
    palette: {
        type: 'dark',
        primary: {
            main: "#e9806e",
        },
        secondary: {
            main: "#011f4b"
        } 
    }
}

const theme = createMuiTheme(customStyles)


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root'));

