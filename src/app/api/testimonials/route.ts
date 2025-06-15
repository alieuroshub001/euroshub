import { NextResponse } from 'next/server';
import { createTestimonial, getTestimonials } from '@/models/testimonial';
import { TestimonialFormData } from '@/types/testimonial';

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    
    // Convert ObjectId to string for client-side
    const serializedTestimonials = testimonials.map(testimonial => ({
      ...testimonial,
      _id: testimonial._id?.toString(),
    }));
    
    return NextResponse.json(serializedTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { message: 'Error fetching testimonials', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const testimonialData: TestimonialFormData = await request.json();
    
    // Validate required fields
    if (!testimonialData.name || !testimonialData.role || !testimonialData.content || !testimonialData.rating) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate rating
    if (testimonialData.rating < 1 || testimonialData.rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const testimonialId = await createTestimonial(testimonialData);
    
    return NextResponse.json(
      { _id: testimonialId.toString() }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { message: 'Error creating testimonial', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}