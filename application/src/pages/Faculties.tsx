import * as React from 'react';
import {Button, TextField} from "@mui/material";
import FacultyItem from "../components/FacultyItem";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FacultyRequests } from '../services';
import {Navigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loggedUserAtom} from "../atoms/loggedUser";
import NotAuthorized from "../components/NotAuthorized";

const schema = z.object({
    name: z.string().nonempty("Faculty name cannot be empty.")
        .max(50, "Faculty name cannot be longer than 50 characters."),
});

const Faculties = () => {
    const loggedUser = useRecoilValue(loggedUserAtom);
    if (loggedUser === null) {
        return <Navigate to="/login"/>;
    }
    if (!loggedUser.admin) {
        return <NotAuthorized/>;
    }

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<{name: string}>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
        }
    });

    const { data: faculties } = useQuery({
        queryKey: ['faculties'],
        queryFn: () => FacultyRequests.getFaculties(),
    });

    const { mutate: createFaculty } = useMutation({
        mutationFn: (info: {
            name: string,
        }) => FacultyRequests.createFaculty(
            info.name
        ),
        onSuccess: () => {
            queryClient.invalidateQueries(['faculties']);
        },
    });

    if(faculties?.data === undefined) {
        return <></>
    }

    if (!faculties) return <>Loading...</>;

    const create = () => {
        const name = getValues().name;
        createFaculty({name})
        reset();
    }

    return (
        <div className="flex flex-col lg:flex-col flex-start m-2 w-full lg:w-1/2">
            <h1 className="font-poppins text-2xl mx-6 my-3 font-bold text-blue-950">
                Faculties
            </h1>
            <div className="rounded-lg border-solid border-2 mx-2">
                <ul className="overflow-y-scroll max-h-96 lg:max-h-64">
                    {faculties.data.map(faculty =>
                        <li
                            className="my-1 mx-1 rounded-lg border-solid border-4 p-0.5"
                            key={faculty.name}
                        >
                            <FacultyItem name={faculty.name} id={faculty.id}/>
                        </li>
                    )}
                </ul>
            </div>
            <form onSubmit={handleSubmit(create)} className="block mx-auto">
                <h2 className="ml-4 mt-4 font-bold text-lg">New faculty:</h2>
                <TextField
                    id="name"
                    label="Name *"
                    className="w-auto lg:w-96"
                    sx={{ margin: '0.5rem 1rem' }}
                    size="small"
                    multiline
                    inputProps={register('name')}
                    error={errors.name !== undefined}
                    helperText={errors.name?.message}
                />
                <Button type="submit" variant="outlined" sx={{ margin: '0.5rem 1rem 1rem' }}>
                    Create new faculty
                </Button>
            </form>
        </div>
    );
};

export default Faculties;
