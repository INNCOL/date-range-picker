import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { TestComponent } from './test-component';

const theme = createTheme();

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TestComponent />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)