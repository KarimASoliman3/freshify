import { NextResponse } from "next/server";
import { getUserToken } from "@/Helpers/getUserToken";
import { OrdersResponse } from "@/interfaces/order";

export async function GET() {
  const token = await getUserToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/orders/", {
    method: "GET",
    headers: {
      token: (token ?? "") + "",
    },
    cache: "no-store",
  });
  const data: OrdersResponse = await response.json();
  return NextResponse.json(data);
}

