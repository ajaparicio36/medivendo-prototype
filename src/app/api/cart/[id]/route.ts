import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  await prisma.cartItem.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Cart item deleted" });
}
