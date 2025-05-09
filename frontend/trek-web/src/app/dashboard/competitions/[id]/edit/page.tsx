import BackButton from "@/app/ui/buttons/back-button";
import CompetitionForm from "@/app/ui/competitions/form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function CompetitionEditPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return (
        <div>
            <Breadcrumbs />
            <BackButton />
            <CompetitionForm formTitle={"Create a Competition"} id={id} isEdit={true} />
        </div>
    )
}