// Next.js
import { NextResponse } from "next/server";
import { getCachedProjects } from "@/lib/data/projects"; // Updated import

// API Route Handler (GET)
export async function GET() {
  try {
    // Fetch data using the cached function
    const projects = await getCachedProjects();

    // Return the validated data, wrapped in an 'items' property
    return NextResponse.json({ items: projects });

  } catch (error: unknown) {
    // Handle errors thrown from getCachedProjects (file read, parse, validation)
    let errorMessage = "An unexpected error occurred while fetching projects data.";
    let statusCode = 500;

    if (error instanceof Error) {
        console.error(`API Error: ${error.message}`, { stack: error.stack });
        // Specific error message from the caught error
        errorMessage = error.message;
        if (error.message.includes("not found")) {
            statusCode = 404;
        } else if (error.message.includes("Invalid JSON") || error.message.includes("Invalid project data format")) {
            statusCode = 500;
        }
    } else {
        console.error("API Error: An unexpected non-error object was thrown:", error);
    }

    return NextResponse.json(
      { message: `Error fetching projects: ${errorMessage}` },
      { status: statusCode }
    );
  }
}