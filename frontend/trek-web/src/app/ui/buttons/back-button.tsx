"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:text-blue-500 transition-all"
        >
            <ArrowLeft size={16} />
            Back
        </button>
    );
}