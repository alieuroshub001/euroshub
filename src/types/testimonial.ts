import { ObjectId } from 'mongodb';

export type Testimonial = {
  _id?: ObjectId | string; 
  name: string;
  role: string;
  content: string;
  rating: number;
  isFeatured?: boolean; 
  createdAt?: Date;
  updatedAt?: Date;
};

export type TestimonialFormData = Omit<Testimonial, '_id' | 'createdAt' | 'updatedAt'>;