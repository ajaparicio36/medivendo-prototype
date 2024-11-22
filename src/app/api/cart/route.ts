import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const cartItems = await prisma.cartItem.findMany({
    include: { medicine: true },
  });
  return NextResponse.json(cartItems);
}

export async function POST(request: Request) {
  const { medicineId, quantity } = await request.json();
  const cartItem = await prisma.cartItem.create({
    data: {
      medicineId,
      quantity,
    },
  });
  return NextResponse.json(cartItem);
}
