import React from 'react';
import ReactDOM from 'react-dom';
import DateRangePicker from './components';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';

const theme = createTheme();

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <div style={{ display: 'flex', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <h1>
                    Test for Date Range Picker
                </h1>
                <DateRangePicker />
            </div>
        </ThemeProvider>


    </React.StrictMode>,
    document.getElementById('root')
);
