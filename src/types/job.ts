import { ObjectId } from 'mongodb';

export type Job = {
  _id?: ObjectId | string; // Allow both ObjectId and string for flexibility
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
    isLive: boolean; // Add this field
  createdAt?: Date;
  updatedAt?: Date;
};

export type JobFormData = Omit<Job, '_id' | 'createdAt' | 'updatedAt'>;