import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </LocalizationProvider>
)
