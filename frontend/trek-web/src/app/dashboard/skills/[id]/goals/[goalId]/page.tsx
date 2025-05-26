import BackButton from "@/app/ui/buttons/back-button";
import GoalDetailsOverview from "@/app/ui/skills/goal-details";

export default async function GoalDetails({ params }: { params: { id: string, goalId: string } }) {
    const {id} = await params;
    const {goalId} = await params;
    
    return(
        <div>
            <BackButton />
            <GoalDetailsOverview skillId={id} goalId={goalId} />
        </div>
    )
}