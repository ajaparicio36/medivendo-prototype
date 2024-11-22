import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const medicines = await prisma.medicine.findMany();
  return NextResponse.json(medicines);
}
