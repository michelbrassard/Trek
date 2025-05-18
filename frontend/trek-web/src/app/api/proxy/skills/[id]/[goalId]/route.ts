import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { goalId: string } }) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }
    const {goalId: id} = await params;
    const url = `http://localhost:8000/skills/goals/${id}`;
    const res = await fetch(url, {
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

export async function PUT(request: NextRequest, { params }: { params: { goalId: string } }) {
    const token = request.cookies.get("access_token")?.value;
    if (!token) {
        return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }
    const {goalId: id} = await params;
    const body = await request.text();
    const url = `http://localhost:8000/skills/goals/${id}/`;
    const res = await fetch(url, {
        method: "PUT",
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

export async function DELETE(request: NextRequest, { params }: { params: { goalId: string } }) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }
    const {goalId: id} = await params;
    const url = `http://localhost:8000/skills/goals/${id}/`;
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}