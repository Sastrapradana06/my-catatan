import { tambahCatatan } from "@/lib/supabase/insert";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const inserMemo = await tambahCatatan(body);
    if (inserMemo.status) {
      return NextResponse.json(
        { status: true, message: inserMemo.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: false, message: inserMemo },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json(error);
  }
}
