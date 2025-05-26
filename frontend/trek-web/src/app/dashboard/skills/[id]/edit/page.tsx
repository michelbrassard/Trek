import BackButton from "@/app/ui/buttons/back-button";
import SkillForm from "@/app/ui/skills/form";

export default async function EditSkill({ params }: { params: { id: string } }) {
    const {id} = await params;
    
    return(
        <div>
            <BackButton />
            <SkillForm formTitle={"Edit Skill"} id={id} isEdit={true} />
        </div>
    );
}