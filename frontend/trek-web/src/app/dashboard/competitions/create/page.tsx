import BackButton from "@/app/ui/buttons/back-button";
import CompetitionForm from "@/app/ui/competitions/form";

export default function CreateCompetitionPage() {
    return(
        <div>
            <BackButton />
            <CompetitionForm formTitle={"Create a Competition"} isEdit={false} />
        </div>
    )
}