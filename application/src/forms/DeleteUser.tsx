import { Button } from '@mui/material';
import React  from 'react';
import {Link, useParams} from 'react-router-dom';
import Warning from "../components/Warning";

export default function DeleteUser() {
    const { id } = useParams();

    //TODO: fetch name of the user
    const name = "Janko Hraško";

    const remove = () => {
        //TODO: delete user
        // and then redirect to /users/
    }

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"user " + name + " (id: " + id + ")"}/>
            <div className="flex flex-row items-center mx-auto">
                <Button color="success" className="w-24 lg:w-40" type="submit"
                        variant="outlined" sx={{ margin: '1rem 1rem' }}
                        onClick={remove}
                >
                    Yes
                </Button>
                <Link to={"/users/" + id + "/show"}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
