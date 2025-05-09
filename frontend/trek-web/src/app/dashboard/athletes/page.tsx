import Enroll from "@/app/ui/athletes/enroll";
import AthletesTable from "@/app/ui/athletes/table";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import Title from "@/app/ui/dashboard/title";

export default function Athletes() {
    return (
        <div>
            <Breadcrumbs />
            <div className="flex flex-row justify-between">
                <Title text="Athletes" />
                <Enroll />
            </div>
            <AthletesTable />
        </div>
    )
}