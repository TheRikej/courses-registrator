export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function pad(d: number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function formatTime(timeslot: { day: string, startHour: number,
        startMinute: number, endHour: number, endMinute: number }) {
    return capitalizeFirstLetter(timeslot.day.toLowerCase()) +
        ` ${pad(timeslot.startHour)}:${pad(timeslot.startMinute)}  –
        ${pad(timeslot.endHour)}:${pad(timeslot.endMinute)}`;
}

export default formatTime;
