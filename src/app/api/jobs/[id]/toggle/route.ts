import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getJobById } from '@/models/job';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params to get the actual values
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, isLive: !job.isLive });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error toggling job status', error },
      { status: 500 }
    );
  }
}