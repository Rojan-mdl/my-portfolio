import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Build the path to your JSON file
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const projects = JSON.parse(jsonData);
    return NextResponse.json({ items: projects });
  } catch (error) {
    console.error("Error reading projects file:", error);
    return NextResponse.json({ error: "Failed to load projects data" }, { status: 500 });
  }
}
