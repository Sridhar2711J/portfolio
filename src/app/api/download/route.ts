import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "Sridhar_Jayaraman.pdf");

    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=\"Sridhar_Jayaraman.pdf\"",
      },
    });
  } catch (error: any) {
    return new NextResponse("Failed to download file: " + error.message, { status: 500 });
  }
}
