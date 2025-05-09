import BackButton from "@/app/ui/buttons/back-button";
import CompetitionForm from "@/app/ui/competitions/form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default function CreateCompetitionPage() {
    return(
        <div>
            <Breadcrumbs />
            <BackButton />
            <CompetitionForm formTitle={"Create a Competition"} isEdit={false} />
        </div>
    )
}