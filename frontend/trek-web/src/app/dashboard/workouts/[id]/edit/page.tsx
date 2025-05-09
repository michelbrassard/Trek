import WorkoutForm from "@/app/ui/workouts/form";
import BackButton from "@/app/ui/buttons/back-button";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function EditWorkout({ params }: { params: { id: string } }) {
    const {id} = await params;
    
    return(
        <div>
            <Breadcrumbs />
            <BackButton />
            <WorkoutForm formTitle={"Edit Workout"} id={id} isEdit={true} />
        </div>
    );
}