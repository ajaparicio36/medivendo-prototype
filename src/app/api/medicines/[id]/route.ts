import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const medicine = await prisma.medicine.findUnique({
    where: { id },
  });

  if (!medicine) {
    return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
  }

  return NextResponse.json(medicine);
}
