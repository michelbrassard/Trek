import Enroll from "@/app/ui/athletes/enroll";
import Table from "@/app/ui/athletes/table";
import Title from "@/app/ui/dashboard/title";

export default function Athletes() {
    return (
        <div className="">
            <Title text="Athletes" />
            <Enroll />
            <Table />
        </div>
    )
}