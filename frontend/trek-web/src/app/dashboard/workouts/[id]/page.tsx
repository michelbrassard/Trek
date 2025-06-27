import BackButton from "@/app/ui/buttons/back-button";
import WorkoutOverviewData from "@/app/ui/workouts/overview-data";
import WorkoutAttendance from "@/app/ui/workouts/save-attendance";

export default async function WorkoutDetails({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <div className="flex flex-row gap-8">
                <WorkoutOverviewData id={id} />
                <WorkoutAttendance id={id} />
            </div>
            
        </div>
    );
}