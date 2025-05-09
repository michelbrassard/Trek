import AthleteOverviewData from "@/app/ui/athletes/overview";
import BackButton from "@/app/ui/buttons/back-button";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function AthleteDetails({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <Breadcrumbs />
            <BackButton />
            <AthleteOverviewData id={id} />
        </div>
    );
}