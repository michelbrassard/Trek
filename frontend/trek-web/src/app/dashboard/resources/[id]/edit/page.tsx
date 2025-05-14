import BackButton from "@/app/ui/buttons/back-button";
import ResourceForm from "@/app/ui/resources/form";

export default async function EditResource({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <ResourceForm formTitle={"Edit Resource"} isEdit={true} id={id} />
        </div>
    )
}