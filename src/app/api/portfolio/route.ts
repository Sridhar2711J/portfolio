import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolio.json");

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read portfolio data: " + error.message }, { status: 500 });
  }
}
