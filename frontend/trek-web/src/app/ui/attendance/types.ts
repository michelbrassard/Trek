export interface Attendee {
    id: string,
    first_name: string,
    last_name: string
}

export interface AttendanceOverviewType {
    id: string,
    title: string,
    description: string,
    date: string,
    length: number,
    unit: string,
    attendees: Attendee[]
}