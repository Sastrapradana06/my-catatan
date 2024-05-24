import { getCatatanUser } from "@/lib/supabase/fetch";
import { NextRequest, NextResponse } from "next/server";
// import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      {
        status: false,
        message: "Query tidak boleh kosong",
        data: [],
      },
      {
        status: 400,
      }
    );
  }

  try {
    const data = await getCatatanUser(query);

    if (data?.status) {
      return NextResponse.json({
        status: true,
        message: "Berhasil mengambil data ",
        data: data.data,
      });
    } else {
      return NextResponse.json(
        {
          status: false,
          message: data.message,
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
