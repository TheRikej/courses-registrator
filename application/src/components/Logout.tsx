import React  from 'react';

// Image source:
export default function Logout() {
    //TODO: logout user

    return (
        <div className="flex flex-col items-center mx-4 max-w-2xl">
            <img src="/assets/success.png" alt="warning" width={250} className="my-4"/>
            <p className="text-center text-2xl font-bold mb-2">
                Successfully logged out!
            </p>
        </div>
    );
}
