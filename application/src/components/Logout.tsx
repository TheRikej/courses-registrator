import React  from 'react';
import {useRecoilState} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import {Navigate} from "react-router-dom";
import { UserRequests } from '../services';

export default function Logout() {
    const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);

    UserRequests.logout();
    React.useEffect(() => {
        setLoggedUser(null)})

    return (
        <div className="flex flex-col items-center mx-4 max-w-2xl">
            <img src="/assets/success.png" alt="warning" width={250} className="my-4"/>
            <p className="text-center text-2xl font-bold mb-2">
                Successfully logged out!
            </p>
        </div>
    );
}
