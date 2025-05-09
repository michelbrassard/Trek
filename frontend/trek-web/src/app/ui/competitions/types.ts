export interface Attendee {
    id: string,
    first_name: string,
    last_name: string
}

export interface CompetitionOverviewType {
    id: string,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    location: string,
    url: string,
    attendees: Attendee[]
}

export interface Competition {
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    location: string,
    url: string
}