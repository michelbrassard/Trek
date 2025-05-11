import BackButton from "@/app/ui/buttons/back-button";
import CompetitionForm from "@/app/ui/competitions/form";

export default async function CompetitionEditPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return (
        <div>
            <BackButton />
            <CompetitionForm formTitle={"Edit Competition"} id={id} isEdit={true} />
        </div>
    )
}