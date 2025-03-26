import AttendanceOverview from "@/app/ui/attendance/attendance-list"
import Title from "@/app/ui/dashboard/title"

export default function Attendance() {
    return (
        <div>
            <Title text="Attendance"/>
            <div>Fetch athletes grouped by workout...</div>
            <AttendanceOverview />
        </div>
    )
}