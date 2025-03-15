import BackButton from "@/app/ui/back-button";
import WorkoutOverviewData from "@/app/ui/workouts/overview";

export default async function WorkoutDetails({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton url="/dashboard/workouts" />
            <WorkoutOverviewData id={id} />
        </div>
    );
}