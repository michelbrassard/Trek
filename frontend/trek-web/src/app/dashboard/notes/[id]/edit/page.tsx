import BackButton from "@/app/ui/buttons/back-button";
import NoteForm from "@/app/ui/notes/form";

export default async function EditNote({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <NoteForm formTitle={"Edit Note"} isEdit={true} id={id} />
        </div>
    )
}