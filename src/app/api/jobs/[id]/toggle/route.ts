import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getJobById, updateJob } from '@/models/job';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const job = await getJobById(params.id);
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