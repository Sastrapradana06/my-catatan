import { handleRegister } from "@/lib/supabase/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const insert = await handleRegister({
      username: body.username,
      email: body.email,
      password: body.password,
    });

    if (!insert.status)
      return NextResponse.json(
        { status: false, message: insert },
        { status: 400 }
      );

    return NextResponse.json(
      { status: true, message: "Created user successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(error);
  }
}
