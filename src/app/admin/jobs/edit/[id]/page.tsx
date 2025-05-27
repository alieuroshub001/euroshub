import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export default function AdminEditJobPage({ params }: Props) {
  return (
    <AdminLayout>
      <JobForm jobId={params.id} />
    </AdminLayout>
  );
}

// Optional: Add metadata if needed
export const metadata: Metadata = {
  title: 'Edit Job',
};