"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/dashboard/')}
            className="flex items-center gap-2"
        >
            <Home size={16} />Home
        </button>
    );
}