import { NextResponse } from 'next/server';
import { getTestimonialById, updateTestimonial, deleteTestimonial } from '@/models/testimonial';
import { ObjectId } from 'mongodb';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid testimonial ID format' },
        { status: 400 }
      );
    }

    const testimonial = await getTestimonialById(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    const serializedTestimonial = {
      ...testimonial,
      _id: testimonial._id?.toString(),
    };

    return NextResponse.json(serializedTestimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      { message: 'Error fetching testimonial', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid testimonial ID format' },
        { status: 400 }
      );
    }

    const testimonialData = await request.json();
    
    if (!testimonialData.name || !testimonialData.role || !testimonialData.content || !testimonialData.rating) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (testimonialData.rating < 1 || testimonialData.rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const updatedCount = await updateTestimonial(id, testimonialData);
    
    if (updatedCount === 0) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { message: 'Error updating testimonial', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid testimonial ID format' },
        { status: 400 }
      );
    }

    const deletedCount = await deleteTestimonial(id);
    
    if (deletedCount === 0) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { message: 'Error deleting testimonial', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid testimonial ID format' },
        { status: 400 }
      );
    }

    const { isFeatured } = await request.json();
    
    if (typeof isFeatured !== 'boolean') {
      return NextResponse.json(
        { message: 'isFeatured must be a boolean' },
        { status: 400 }
      );
    }

    const updatedCount = await updateTestimonial(id, { isFeatured });
    
    if (updatedCount === 0) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating featured status:', error);
    return NextResponse.json(
      { message: 'Error updating featured status', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}