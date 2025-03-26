import Link from "next/dist/client/link"
import { AttendanceOverviewType } from "./types"

interface AttendanceListItemProp {
    data: AttendanceOverviewType
}

export default function AttendanceListItem({ data }: AttendanceListItemProp) {
    return(
        <Link href={`/dashboard/workouts/${data.id}`}>
            <div className="my-4 px-4 py-3 border rounded-xl border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50 hover:dark:bg-blue-950 transition-colors">
                <p className="text-xs">{data.date}</p>
                <h2 className="text-xl font-bold my-1">{data.title}</h2>
                <p className="text-sm">{data.description}</p>
                <p>{data.length} {data.unit}</p>
                <div className="mt-2">
                    {data.attendees.length != 0 ? 
                        <div>
                            {data.attendees.map((attendee) => (
                                <div key={attendee.id}>
                                    <p>{attendee.id}</p>
                                    <p>{attendee.first_name}</p>
                                    <p>{attendee.last_name}</p>
                                </div>
                            ))}
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