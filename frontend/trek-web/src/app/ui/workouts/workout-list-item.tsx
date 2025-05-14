import Link from "next/dist/client/link"
import { WorkoutOverviewType } from "./types"

interface AttendanceListItemProp {
    data: WorkoutOverviewType
}

export default function WorkoutListItem({ data }: AttendanceListItemProp) {
    return(
        <Link href={`/dashboard/workouts/${data.id}`}>
            <div className="w-full mb-4 px-4 py-3 border rounded-xl border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50 hover:dark:bg-blue-950 transition-colors">
                <p className="text-xs">{data.date} (...day name?)</p>
                <h2 className="text-xl font-bold my-1">{data.title}</h2>
                <p className="text-sm">{data.description}</p>
                <p>{data.length} {data.unit}</p>
                <div className="mt-2">
                    {data.attendees.length != 0 ? 
                        <div>
                            <span className="font-semibold">Attendees</span>
                            <div className="flex flex-wrap gap-2 m-1">
                                {data.attendees.map((attendee) => (
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