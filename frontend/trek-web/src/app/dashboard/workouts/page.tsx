import Title from "@/app/ui/dashboard/title";
import WorkoutsTable from "@/app/ui/workouts/table";
import Link from "next/link";

export default function Workouts() {
    return (
        <div>
            <Title text="Workouts"/>
            <Link href={'workouts/create'}>New</Link>
            <WorkoutsTable />
        </div>
    )
}