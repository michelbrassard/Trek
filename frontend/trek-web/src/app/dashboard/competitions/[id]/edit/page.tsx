import BackButton from "@/app/ui/buttons/back-button";

export default async function CompetitionEditPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <div>Edit form: {id}</div>
        </div>
    );
}