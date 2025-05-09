import WorkoutForm from "@/app/ui/workouts/form";
import BackButton from "@/app/ui/buttons/back-button";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default function CreateWorkout() {
    return(
        <div>
            <Breadcrumbs />
            <BackButton />
            <WorkoutForm formTitle={"Create a Workout"} isEdit={false} />
        </div>
    );
}