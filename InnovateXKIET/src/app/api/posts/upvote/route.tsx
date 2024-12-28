import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/post';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectToDatabase();

    const { postId, userId } = await req.json();

    try {
        const post = await Post.findById(postId);

        if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const hasUpvoted = post.upvotes.includes(userObjectId);

        let updatedUpvotes;

        if (hasUpvoted) {
            updatedUpvotes = post.upvotes.filter((id: mongoose.Types.ObjectId) => !id.equals(userObjectId));
        } else {
            updatedUpvotes = [...post.upvotes, userObjectId];
        }

        post.upvotes = updatedUpvotes;
        await post.save();

        return NextResponse.json({ success: true, upvotes: post.upvotes });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating upvotes', error }, { status: 500 });
    }
}
