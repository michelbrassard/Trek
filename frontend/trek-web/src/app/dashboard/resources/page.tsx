import Title from "@/app/ui/dashboard/title";
import ResourcesOverview from "@/app/ui/resources/overview";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Resources() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Title text="Resources" />
                <Link href={'resources/create'} >
                    <div className="flex items-center gap-2 text-blue-500">
                        <Plus size={16}/> New
                    </div>
                </Link>
            </div>
            <ResourcesOverview />
        </div>
    )
}