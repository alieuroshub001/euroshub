import { Collection, Db, ObjectId } from 'mongodb';
import clientPromise from '../lib/db';

interface TestimonialData {
  name: string;
  role: string;
  content: string;
  rating: number;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

let cachedDb: Db;
let cachedTestimonials: Collection;

async function connectToDatabase() {
  if (cachedDb && cachedTestimonials) {
    return { db: cachedDb, testimonialsCollection: cachedTestimonials };
  }

  const client = await clientPromise;
  const db = client.db();
  cachedDb = db;
  cachedTestimonials = db.collection('testimonials');

  // Create indexes for better query performance
  await cachedTestimonials.createIndex({ name: 'text' });
  await cachedTestimonials.createIndex({ rating: -1 });
  await cachedTestimonials.createIndex({ isFeatured: 1 });

  return { db, testimonialsCollection: cachedTestimonials };
}

export const getTestimonials = async (featuredOnly: boolean = false) => {
  const { testimonialsCollection } = await connectToDatabase();
  const query = featuredOnly ? { isFeatured: true } : {};
  return testimonialsCollection.find(query).sort({ createdAt: -1 }).toArray();
};

export const getTestimonialById = async (id: string) => {
  const { testimonialsCollection } = await connectToDatabase();
  return testimonialsCollection.findOne({ _id: new ObjectId(id) });
};

export const createTestimonial = async (testimonialData: TestimonialData) => {
  const { testimonialsCollection } = await connectToDatabase();
  const result = await testimonialsCollection.insertOne({
    ...testimonialData,
    isFeatured: testimonialData.isFeatured || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.insertedId;
};

export const updateTestimonial = async (id: string, testimonialData: Partial<TestimonialData>) => {
  const { testimonialsCollection } = await connectToDatabase();
  const result = await testimonialsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...testimonialData, updatedAt: new Date() } }
  );
  return result.modifiedCount;
};

export const deleteTestimonial = async (id: string) => {
  const { testimonialsCollection } = await connectToDatabase();
  const result = await testimonialsCollection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
};

export const toggleTestimonialFeatured = async (id: string, isFeatured: boolean) => {
  const { testimonialsCollection } = await connectToDatabase();
  const result = await testimonialsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { isFeatured, updatedAt: new Date() } }
  );
  return result.modifiedCount;
};