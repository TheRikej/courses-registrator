import { ExpandMore } from '@mui/icons-material';

import {
    AppBar,
    Toolbar,
} from '@mui/material';

import React from 'react';
import {Link} from "react-router-dom";

//TODO: link to / (main page - list of courses) when clicked on "Course registrator"
//TODO 2: add "logged in as ..." to the right of the panel
export default function Header() {

    return (
        <AppBar position="static">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                <Link to="/" className="text-base lg:text-xl m-2 lg:mx-4">Course registrator</Link>
                <div className="dropdown">
                    <div className="m-2 lg:mx-4">
                        <button id="admin_panel-button" color="inherit" className="dropbtn">
                            Admin panel <ExpandMore />
                        </button>
                    </div>
                    <div className="dropdown-content">
                        <Link to="/users">Users</Link>
                        <Link to="/semesters">Semesters</Link>
                        <Link to="/faculties">Faculties</Link>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}
