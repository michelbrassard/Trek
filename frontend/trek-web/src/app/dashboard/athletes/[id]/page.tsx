import AthleteOverviewData from "@/app/ui/athletes/overview";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AthleteDetails({ params }: { params: { id: string } }) {
    const {id} = await params;
    return(
        <div>
            <Link href="/dashboard/athletes" className="">
                <div className="flex items-center gap-2">
                    <ArrowLeft size={16}/>
                    Back
                </div>
                
            </Link>
            <AthleteOverviewData id={id} />
        </div>
    );
}