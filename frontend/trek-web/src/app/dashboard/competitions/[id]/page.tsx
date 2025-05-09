import BackButton from "@/app/ui/buttons/back-button";
import CompetitionOverviewData from "@/app/ui/competitions/overview";
import CompetitionAttendance from "@/app/ui/competitions/save-attendance";

export default async function CompetitionDetailsPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <BackButton />
            <CompetitionOverviewData id={id} />
            <CompetitionAttendance id={id} />
        </div>
    );
}