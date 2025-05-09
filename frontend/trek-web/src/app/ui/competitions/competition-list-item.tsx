import Link from "next/dist/client/link"
import { CompetitionOverviewType } from "./types"

interface AttendanceListItemProp {
    competition: CompetitionOverviewType
}

export default function CompetitionListItem({ competition }: AttendanceListItemProp) {
    return(
        <Link href={`/dashboard/competitions/${competition.id}`}>
            <div className="my-4 px-4 py-3 border rounded-xl border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50 hover:dark:bg-blue-950 transition-colors">
                <p className="text-xs">{competition.startDate} - {competition.endDate}</p>
                <h2 className="text-xl font-bold my-1">{competition.title}</h2>
                <p className="text-sm">{competition.description}</p>
                <p>{competition.location}</p>
                <p>{competition.url}</p>
                <div className="mt-2">
                    {competition.attendees.length != 0 ? 
                        <div>
                            <span className="font-semibold">Attendees</span>
                            <div className="flex flex-wrap gap-2 m-1">
                                {competition.attendees.map((attendee) => (
                                    <div key={attendee.id}>
                                        <p className="text-sm border-l pl-2">{attendee.first_name} {attendee.last_name}</p>
                                    </div>
                                ))}
                            </div>
                        </div> 
                        : 
                        <div>
                            <p className="text-neutral-400 dark:text-neutral-600">No attendance...</p>
                        </div>
                    }
                </div>
            </div>
        </Link>
        
    )
}