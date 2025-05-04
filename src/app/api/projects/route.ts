import { NextResponse } from "next/server"; // Import NextResponse for creating API responses in Next.js
import path from "path"; // Import Node.js 'path' module for working with file paths
import { promises as fs } from "fs"; // Import Node.js 'fs' module (file system) with promises API for async operations

// Define the asynchronous handler function for GET requests to this API route (/api/projects)
export async function GET() {
  try {
    // Construct the absolute path to the projects.json file
    // process.cwd() returns the current working directory of the Node.js process (project root)
    const jsonDirectory = path.join(process.cwd(), "data"); // Path to the 'data' directory
    const filePath = path.join(jsonDirectory, "projects.json"); // Full path to the JSON file

    // Asynchronously read the contents of the file as a UTF-8 string
    const fileContents = await fs.readFile(filePath, "utf8");
    // TODO: Add validation to ensure fileContents is not empty before parsing.

    // Parse the JSON string into a JavaScript object/array
    const data = JSON.parse(fileContents);
    // TODO: Implement data validation (e.g., using Zod or a similar library) to ensure the parsed data matches the expected Project[] structure. This prevents errors if the JSON file is malformed.

    // Return the parsed data as a JSON response with a 200 OK status
    return NextResponse.json(data);
    // TODO: Consider implementing caching mechanisms (e.g., using Next.js data fetching strategies like ISR or server-side caching headers) if the projects.json data doesn't change frequently, to improve performance.
  } catch (error) {
    // Log the error to the server console for debugging purposes
    console.error("Error reading projects data:", error);
    // TODO: Implement more robust error logging (e.g., sending errors to a monitoring service).

    // Return a JSON error response with a 500 Internal Server Error status
    return NextResponse.json(
      { message: "Error fetching projects data" }, // User-friendly error message
      { status: 500 } // HTTP status code
    );
  }
}

// TODO: Consider adding handlers for other HTTP methods (POST, PUT, DELETE) if project data management via API is needed in the future.
