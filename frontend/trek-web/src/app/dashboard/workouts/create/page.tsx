import WorkoutForm from "@/app/ui/workouts/form";
import BackButton from "@/app/ui/buttons/back-button";

export default function CreateWorkout() {
    return(
        <div>
            <BackButton />
            <WorkoutForm formTitle={"Create a Workout"} isEdit={false} />
        </div>
    );
}