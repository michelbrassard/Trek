import Enroll from "@/app/ui/athletes/enroll";
import Table from "@/app/ui/athletes/table";

export default function Athletes() {
    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-2">Athletes</h1>
            <Enroll />
            <Table />
        </div>
    )
}