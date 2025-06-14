import { Collection, Db, ObjectId } from 'mongodb';
import clientPromise from '../lib/db';

// Define your job types
interface JobData {
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  // Add other required fields as needed
}

interface JobUpdateData extends Partial<JobData> {
  isLive?: boolean;
  // Add other optional fields that can be updated
}

let cachedDb: Db;
let cachedJobs: Collection;

async function connectToDatabase() {
  if (cachedDb && cachedJobs) {
    return { db: cachedDb, jobsCollection: cachedJobs };
  }

  const client = await clientPromise;
  const db = client.db();
  cachedDb = db;
  cachedJobs = db.collection('jobs');

  await cachedJobs.createIndex({ title: 'text' });
  await cachedJobs.createIndex({ department: 1 });
  await cachedJobs.createIndex({ location: 1 });

  return { db, jobsCollection: cachedJobs };
}

export const getJobs = async () => {
  const { jobsCollection } = await connectToDatabase();
  return jobsCollection.find().sort({ createdAt: -1 }).toArray();
};

export const getJobById = async (id: string) => {
  const { jobsCollection } = await connectToDatabase();
  return jobsCollection.findOne({ _id: new ObjectId(id) });
};

export const createJob = async (jobData: JobData) => {
  const { jobsCollection } = await connectToDatabase();
  const result = await jobsCollection.insertOne({
    ...jobData,
    isLive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.insertedId;
};

export const updateJob = async (id: string, jobData: JobUpdateData) => {
  const { jobsCollection } = await connectToDatabase();
  const result = await jobsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...jobData, updatedAt: new Date() } }
  );
  return result.modifiedCount;
};

export const deleteJob = async (id: string) => {
  const { jobsCollection } = await connectToDatabase();
  const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
};