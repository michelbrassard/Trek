import BackButton from "@/app/ui/buttons/back-button";
import GoalForm from "@/app/ui/goals/form";

export default async function EditGoal({ params }: { params: { id: string, goalId: string } }) {
    const {id} = await params;
    const {goalId} = await params;
    
    return(
        <div>
            <BackButton />
            <GoalForm formTitle={"Edit Goal"} isEdit={true} skillId={id} goalId={goalId}/>
        </div>
    )
}