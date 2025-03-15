import WorkoutForm from "@/app/ui/workouts/form";
import BackButton from "@/app/ui/back-button";

export default async function EditWorkout({ params }: { params: { id: string } }) {
    const {id} = await params;
    
    return(
        <div>
            <BackButton url={`/dashboard/workouts/${id}`} />
            <WorkoutForm formTitle={"Edit Workout"} id={id} isEdit={true} />
        </div>
    );
}