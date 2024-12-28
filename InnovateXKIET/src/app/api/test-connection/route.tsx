import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database using the cached connection or establish a new one
    const { db } = await connectToDatabase();

    // Check the connection status (1 = connected)
    if (db.readyState === 1) {
      return NextResponse.json({ message: 'Database connection is healthy' });
    } else {
      return NextResponse.json({ message: 'Database connection is not healthy' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // If the connection fails, return an error response with a 500 status
    return NextResponse.json({ error: 'Database connection failed', details: error.message },
      { status: 500 }
    );
  }
}
