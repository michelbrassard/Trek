import BackButton from "@/app/ui/buttons/back-button";
import NoteForm from "@/app/ui/notes/form";

export default function CreateNote() {
    return(
        <div>
            <BackButton />
            <NoteForm formTitle={"Create Note"} isEdit={false} />
        </div>
    );
}