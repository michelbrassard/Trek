import LogOutButton from "@/app/ui/dashboard/logout-button";
import Title from "@/app/ui/dashboard/title";
import ProfileData from "@/app/ui/dashboard/welcome";

export default function ProfilePage() {
    return(
        <div>
            <Title text="Profile"/>
            <ProfileData />
            <LogOutButton />
        </div>
    );
}