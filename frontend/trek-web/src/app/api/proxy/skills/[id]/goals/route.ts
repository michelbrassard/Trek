import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }
    const {id} = await params;
    const res = await fetch(`http://localhost:8000/skills/${id}/goals`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }

    const body = await request.text();
    const {id} = await params;
    const res = await fetch(`http://localhost:8000/skills/${id}/goals`, {
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