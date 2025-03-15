import AthleteOverviewData from "@/app/ui/athletes/overview";
import BackButton from "@/app/ui/back-button";

export default async function AthleteDetails({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton url="/dashboard/athletes" />
            <AthleteOverviewData id={id} />
        </div>
    );
}