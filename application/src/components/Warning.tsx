import React  from 'react';

// Image source: https://creazilla.com/nodes/3431655-warning-icon
export default function Warning(props: {item: string}) {
    return (
        <div className="flex flex-col items-center mx-4 max-w-2xl">
            <img src="/assets/warning.png" alt="warning" width={250} className="mr-4 my-4"/>
            <p className="text-center text-xl font-bold mb-2">
                Are you really sure you want to permanently remove {props.item}?
            </p>
        </div>
    );
}
