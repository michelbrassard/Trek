import BackButton from "@/app/ui/buttons/back-button";
import Title from "@/app/ui/dashboard/title";
import Canvas from "@/app/ui/workouts/canvas";

export default function Experiment() {
    return (
        <div>
            <BackButton />
            <Title text={"Experimental!"} />
            <Canvas />
        </div>
    )
    
}