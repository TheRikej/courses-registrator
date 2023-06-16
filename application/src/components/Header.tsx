import {ExpandMore, Logout} from '@mui/icons-material';

import {
    AppBar,
    Toolbar,
} from '@mui/material';

import React from 'react';
import {Link} from "react-router-dom";

export default function Header() {
    //TODO: get from auth
    const name = "Jakub Judiny";
    const id = 4354;

    return (
        <AppBar position="static">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                <Link to="/" className="hidden lg:block text-sm lg:text-xl mx-1 lg:my-auto lg:mx-4">
                    Course registrator
                </Link>
                <div className="flex flex-row-reverse lg:flex-row space-between w-full lg:w-auto">
                    <div className="dropdown admin-only">
                        <div className="mx-2 my-auto lg:mx-4">
                            <button id="admin_panel-button" color="inherit" className="dropbtn">
                                Admin panel <ExpandMore />
                            </button>
                        </div>
                        <div className="dropdown-content">
                            <Link to="/users/">Users</Link>
                            <Link to="/semesters/">Semesters</Link>
                            <Link to="/faculties/">Faculties</Link>
                        </div>
                    </div>
                    <div className="vl"></div>
                    <div className="mr-auto ml-2 my-auto lg:mx-1 text-sm lg:text-base">
                        <div className="dropdown">
                            <div className="mx-2 my-auto lg:mx-3">
                                <button id="admin_panel-button" color="inherit" className="dropbtn">
                                    Logged in as {name} <ExpandMore />
                                </button>
                            </div>
                            <div className="dropdown-content">
                                <Link to={"/users/" + id + "/show"}>My profile</Link>
                                <Link to="/logout/"><Logout/> Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}
