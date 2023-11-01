import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const newFolder = await prisma.folder.create({
    data: body,
  });

  return NextResponse.json(newFolder);
}

export async function PUT(req: NextRequest) {
  const { newName, userId, folderId } = await req.json();

  const updatedFolder = await prisma.folder.update({
    where: {
      id: folderId,
      userId,
    },
    data: {
      name: newName,
    },
  });

  return NextResponse.json(updatedFolder);
}
