import Enroll from "@/app/ui/athletes/enroll";
import AthletesTable from "@/app/ui/athletes/table";
import Title from "@/app/ui/dashboard/title";

export default function Athletes() {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <Title text="Athletes" />
                <Enroll />
            </div>
            <AthletesTable />
        </div>
    )
}