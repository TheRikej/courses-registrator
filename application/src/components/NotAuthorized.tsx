import { Link } from "react-router-dom";
import React  from 'react';

// Image source: https://www.expression-web-tutorials.com/403.shtml
export default function NotAuthorized() {
    return (
        <div className="flex flex-col items-center mx-4">
            <img src="/assets/forbidden.jpg" alt="not authorized" width="400" className="m-4"/>
            <h1 className="text-2xl font-bold mb-4 text-center">You do not have sufficient permission to do this.</h1>
            <Link to='/' className="text-xl text-blue-700 underline mb-4">Return to home page</Link>
        </div>
    );
}
