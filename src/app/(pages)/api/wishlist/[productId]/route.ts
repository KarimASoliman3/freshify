import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "@/Helpers/getUserToken";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params;
  const token = await getUserToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token ?? "",
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
