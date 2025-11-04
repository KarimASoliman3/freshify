import { NextResponse } from "next/server";
import { getUserToken } from "@/Helpers/getUserToken";
import { WishlistResponse } from "@/interfaces/wishlist";

export async function GET() {
  const token = await getUserToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token: (token ?? "") + "",
    },
    cache: "no-store",
  });
  const data: WishlistResponse = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const token = await getUserToken();
  const body = await request.json();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: (token ?? "") + "",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}


