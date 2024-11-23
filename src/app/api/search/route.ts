import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "No search query provided" },
      { status: 400 }
    );
  }

  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.trim() !== "");

  try {
    const medicines = await prisma.medicine.findMany({
      where: {
        OR: searchTerms.flatMap((term) => [
          { name: { contains: term, mode: "insensitive" } },
          { description: { contains: term, mode: "insensitive" } },
          { tags: { has: term } },
          { name: { startsWith: term, mode: "insensitive" } },
        ]),
      },
    });

    return NextResponse.json(medicines);
  } catch (error) {
    console.error("Error searching medicines:", error);
    return NextResponse.json(
      { error: "An error occurred while searching for medicines" },
      { status: 500 }
    );
  }
}
