import Title from "@/app/ui/dashboard/title";
import WorkoutsTable from "@/app/ui/workouts/table";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Workouts() {
    return (
        <div>
            <Title text="Workouts"/>
            <Link href={'workouts/create'} >
                <div className="flex items-center gap-2 text-blue-500">
                    <Plus size={16}/> New
                </div>
            </Link>
            <p>Vidi još kako ide sa usability perspektive jel bolje samo kao attendance page tj. spojit to dvoje u jedan</p>
            <WorkoutsTable />
        </div>
    )
}