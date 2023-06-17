import { Link } from "react-router-dom";
import React  from 'react';

// Image source: https://commons.wikimedia.org/wiki/File:Sad_Emoji_-_FREE_%2850215487012%29.png
export default function NotFound() {
    return (
        <div className="flex flex-col items-center mx-4">
            <img src="/assets/sad_emoji.png" alt="sad emoji face" width="400" className="mr-4"/>
            <h1 className="text-2xl font-bold mb-4">Page not found (Error 404)</h1>
            <Link to='/' className="text-xl text-blue-700 underline">Return to home page</Link>
        </div>
    );
}
