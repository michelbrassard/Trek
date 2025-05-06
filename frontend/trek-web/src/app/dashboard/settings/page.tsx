import BackButton from "@/app/ui/buttons/back-button";
import Title from "@/app/ui/dashboard/title";

export default function AccountSettings() {
    return(
        <div>
            <div className="mb-2 text-neutral-500">
                <BackButton />
            </div>
            <Title text="Settings"/>
            <div>Some text...</div>
        </div>
    )
}