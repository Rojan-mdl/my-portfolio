import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Construct the absolute path to the JSON file
    // process.cwd() gives the project root directory
    const jsonDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(jsonDirectory, 'projects.json');

    // Read the file content
    const fileContents = await fs.readFile(filePath, 'utf8');

    // Parse the JSON data
    const data = JSON.parse(fileContents);

    // Return the data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading projects data:', error);
    // Return an error response
    return NextResponse.json({ message: 'Error fetching projects data' }, { status: 500 });
  }
}
