import BackButton from "@/app/ui/buttons/back-button";

export default async function CompetitionDetailsPage({ params }: { params: { id: string } }) {
    const {id} = await params;
        return(
            <div>
                <BackButton />
                <div>Details id: {id}</div>
            </div>
        );
}