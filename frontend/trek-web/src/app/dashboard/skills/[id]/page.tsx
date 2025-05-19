import BackButton from "@/app/ui/buttons/back-button";
import SkillGoalList from "@/app/ui/skills/skill-goal-list";

export default async function SkillDetails({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <SkillGoalList id={id} />
        </div>
    )
}