import BackButton from "@/app/ui/buttons/back-button";
import CompetitionOverviewData from "@/app/ui/competitions/overview";
import CompetitionAttendance from "@/app/ui/competitions/save-attendance";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function CompetitionDetailsPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <Breadcrumbs />
            <BackButton />
            <CompetitionOverviewData id={id} />
            <CompetitionAttendance id={id} />
        </div>
    );
}