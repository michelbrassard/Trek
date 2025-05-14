"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname()

    const handleGoBack = () => {
        const segments = pathname.split('/')
        segments.pop()
        const newPath = segments.join('/') || '/'
        router.push(newPath)
    }

    return (
        <button
            onClick={handleGoBack}
            className="flex items-center gap-2 hover:text-blue-500 transition-all"
        >
            <ArrowLeft size={16} />
            Back
        </button>
    );
}