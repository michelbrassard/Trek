import BackButton from "@/app/ui/buttons/back-button";
import ResourceDetails from "@/app/ui/resources/details";

export default async function ResourceDetailsPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <ResourceDetails id={id} />
        </div>
    );
}