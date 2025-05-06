import BackButton from "@/app/ui/buttons/back-button";
import LogOutButton from "@/app/ui/dashboard/logout-button";
import Title from "@/app/ui/dashboard/title";
import ProfileData from "@/app/ui/dashboard/welcome";

export default function ProfilePage() {
    return(
        <div>
            <div className="mb-2 text-neutral-500">
                <BackButton />
            </div>
            <Title text="Profile"/>
            <ProfileData />
            <LogOutButton />
        </div>
    );
}