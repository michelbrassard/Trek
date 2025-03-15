import CreateWorkoutForm from "@/app/ui/workouts/create";
import BackButton from "@/app/ui/back-button";

export default function CreateWorkout() {
    return(
        <div>
            <BackButton url="/dashboard/workouts" />
            <CreateWorkoutForm />
        </div>
    );
}