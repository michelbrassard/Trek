import BackButton from "@/app/ui/buttons/back-button";
import NotesDetails from "@/app/ui/notes/details";

export default async function NotesDetailsPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <NotesDetails id={id} />
        </div>
    );
}