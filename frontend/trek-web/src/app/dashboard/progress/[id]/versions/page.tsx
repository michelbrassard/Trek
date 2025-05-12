import BackButton from "@/app/ui/buttons/back-button";
import ProgressVersions from "@/app/ui/progress/versions-overview";

export default async function ProgressVersionsOverview({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
            <div>
                <BackButton />
                <ProgressVersions id={id} />
            </div>
        )
}