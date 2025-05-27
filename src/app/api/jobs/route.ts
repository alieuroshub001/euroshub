import { NextResponse } from 'next/server';
import { createJob, getJobs } from '@/models/job';
import { JobFormData } from '@/types/job';
// Remove this line: import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const jobs = await getJobs();
    
    // Convert ObjectId to string for client-side
    const serializedJobs = jobs.map(job => ({
      ...job,
      _id: job._id?.toString(),
    }));
    
    return NextResponse.json(serializedJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { message: 'Error fetching jobs', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const jobData: JobFormData = await request.json();
    
    // Validate required fields
    if (!jobData.title || !jobData.type || !jobData.location || !jobData.department || !jobData.description) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const jobId = await createJob(jobData);
    
    return NextResponse.json(
      { _id: jobId.toString() }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { message: 'Error creating job', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}