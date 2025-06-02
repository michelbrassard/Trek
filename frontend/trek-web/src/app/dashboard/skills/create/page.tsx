import BackButton from "@/app/ui/buttons/back-button";
import SkillForm from "@/app/ui/skills/form";

export default function CreateSkill() {
    return(
        <div>
            <BackButton />
            <SkillForm formTitle={"Create a Skill"} isEdit={false} />
        </div>
    );
}