import BackButton from "@/app/ui/buttons/back-button";
import ResourceForm from "@/app/ui/resources/form";

export default function CreateResource() {
    return(
        <div>
            <BackButton />
            <ResourceForm formTitle={"Create Resource"} isEdit={false} />
        </div>
    );
}