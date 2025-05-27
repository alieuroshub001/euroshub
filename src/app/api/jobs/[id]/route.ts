import { NextResponse } from 'next/server';
import { getJobById, updateJob, deleteJob } from '@/models/job';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid job ID format' },
        { status: 400 }
      );
    }

    const job = await getJobById(params.id);
    
    if (!job) {
      return NextResponse.json(
        { message: 'Job not found' },
        { status: 404 }
      );
    }

    // Convert ObjectId to string for client-side
    const serializedJob = {
      ...job,
      _id: job._id?.toString(),
    };

    return NextResponse.json(serializedJob);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { message: 'Error fetching job', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid job ID format' },
        { status: 400 }
      );
    }

    const jobData = await request.json();
    
    // Validate required fields
    if (!jobData.title || !jobData.type || !jobData.location || !jobData.department || !jobData.description) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const updatedCount = await updateJob(params.id, jobData);
    
    if (updatedCount === 0) {
      return NextResponse.json(
        { message: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { message: 'Error updating job', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid job ID format' },
        { status: 400 }
      );
    }

    const deletedCount = await deleteJob(params.id);
    
    if (deletedCount === 0) {
      return NextResponse.json(
        { message: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { message: 'Error deleting job', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}