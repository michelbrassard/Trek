import BackButton from "@/app/ui/buttons/back-button";
import Title from "@/app/ui/dashboard/title";
import AllProgressVersionsList from "@/app/ui/progress/all-progress-versions";

export default function AllProgressVersions() {
    return (
        <div>
            <BackButton />
            <Title text="Progress" />
            <AllProgressVersionsList />
        </div>
    )
}