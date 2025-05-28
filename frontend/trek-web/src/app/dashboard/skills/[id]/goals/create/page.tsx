import BackButton from "@/app/ui/buttons/back-button";
import GoalForm from "@/app/ui/goals/form";

export default async function CreateGoal({ params }: { params: { id: string } }) {
    const {id} = await params;

    return(
        <div>
            <BackButton />
            <GoalForm formTitle={"Create a Goal"} isEdit={false} skillId={id} />
        </div>
        
    )
}