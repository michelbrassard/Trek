import WorkoutForm from "@/app/ui/workouts/form";
import BackButton from "@/app/ui/buttons/back-button";

export default async function EditWorkout({ params }: { params: { id: string } }) {
    const {id} = await params;
    
    return(
        <div>
            <BackButton />
            <WorkoutForm formTitle={"Edit Workout"} id={id} isEdit={true} />
        </div>
    );
}