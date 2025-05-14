import BackButton from "@/app/ui/buttons/back-button";
import ProgressDetails from "@/app/ui/progress/latest-progress";

export default async function NotesDetailsPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <ProgressDetails id={id} />
        </div>
    );
}