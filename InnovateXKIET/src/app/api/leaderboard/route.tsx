// src/pages/api/leaderboard.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Leaderboard } from '@/models/leaderboard';

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDatabase();

        // Fetch all leaderboard entries, sorted by points in descending order
        const leaderboard = await Leaderboard.find({})
            .sort({ points: -1 })
            .limit(10)
            .lean(); // Use lean for better performance

        // Return the leaderboard data as JSON
        return NextResponse.json({ success: true, data: leaderboard });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch leaderboard' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const db = await connectToDatabase();
        const { name, department, points } = await req.json();

        // Validate the presence of required fields
        if (!name || !department || points === undefined) {
            return NextResponse.json({ success: false, message: 'Name, department, and points are required' }, { status: 400 });
        }

        // Create a new leaderboard entry
        const newEntry = {
            name,
            department,
            points,
            createdAt: new Date(),
        };

        const result = await Leaderboard.create(newEntry);

        return NextResponse.json({ success: true, ...newEntry, id: result._id }, { status: 201 });
    } catch (error) {
        console.error('Error creating leaderboard entry:', error);
        return NextResponse.json({ success: false, message: 'Failed to create leaderboard entry' }, { status: 500 });
    }
}
