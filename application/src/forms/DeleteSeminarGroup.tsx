import { Button } from '@mui/material';
import React  from 'react';
import {Link, useParams} from 'react-router-dom';
import Warning from "../components/Warning";

export default function DeleteSeminarGroup() {
    const { code, semester, group } = useParams();

    const remove = () => {
        //TODO: delete the seminar group
        // and then redirect to /courses/:code/:semester/show
    }

    return (
        <div className="flex flex-col mx-auto max-w-2xl">
            <Warning item={"seminar group " + group + " of " + code?.toUpperCase()
                + " in " + semester?.toLowerCase()}/>
            <div className="flex flex-row items-center mx-auto">
                <Button color="success" className="w-24 lg:w-40" type="submit"
                        variant="outlined" sx={{ margin: '1rem 1rem' }}
                        onClick={remove}
                >
                    Yes
                </Button>
                <Link to={"/courses/" + code + "/" + semester + "/seminars/" + group + "/show"}>
                    <Button color="error" className="w-24 lg:w-40" type="submit" variant="outlined" sx={{ margin: '1rem 1rem' }}>
                        No
                    </Button>
                </Link>
            </div>
        </div>
    );
}
