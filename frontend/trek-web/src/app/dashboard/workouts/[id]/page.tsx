import BackButton from "@/app/ui/buttons/back-button";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import WorkoutOverviewData from "@/app/ui/workouts/overview";
import WorkoutAttendance from "@/app/ui/workouts/save-attendance";

export default async function WorkoutDetails({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <Breadcrumbs />
            <BackButton />
            <WorkoutOverviewData id={id} />
            <WorkoutAttendance id={id} />
        </div>
    );
}