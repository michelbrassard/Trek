import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }
    const {id} = await params;
    const body = await request.text();
    const res = await fetch(`http://localhost:8000/progress/${id}/save/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body,
        credentials: "include",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}