import BackButton from "@/app/ui/buttons/back-button";
import GoalList from "@/app/ui/skills/goal-list";

export default async function SkillGoals({ params }: { params: { id: string } }) {
    const {id} = await params;
    
    return(
    <div>
        <BackButton />
        <GoalList id={id} />
    </div>)
}