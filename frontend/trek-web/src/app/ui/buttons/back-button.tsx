import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
    url: string
}

export default function BackButton({url}: BackButtonProps) {
    return(
        <Link href={url}>
            <div className="flex items-center gap-2">
                <ArrowLeft size={16}/>
                Back
            </div>
        </Link>
    );
}