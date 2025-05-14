import BackButton from "@/app/ui/buttons/back-button";
import ProgressForm from "@/app/ui/progress/form-item";

export default function CreateProgressItem() {
    return(
        <div>
            <BackButton />
            <ProgressForm formTitle={"Create Progress item"} isEdit={false} />
        </div>
    );
}