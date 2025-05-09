export interface SearchedWorkout {
    type: "workout",
    id: string,
    title: string,
    description: string,
    date: string,
    length: number,
    unit: string
}

export interface SearchedCompetition {
    type: "competition",
    id: string,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    location: string
}

export interface SearchedAthlete {
    type: "athlete",
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    phone: string
    date_of_birth: string
}