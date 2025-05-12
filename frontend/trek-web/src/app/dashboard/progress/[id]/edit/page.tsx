import BackButton from "@/app/ui/buttons/back-button";
import ProgressForm from "@/app/ui/progress/form-item";

export default async function EditProgress({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <ProgressForm formTitle={"Edit Progress"} isEdit={true} id={id} />
        </div>
    )
}