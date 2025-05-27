import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';
import { Metadata } from 'next';

// Define proper type for page props
type PageProps = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

// Main component with proper typing
function EditJobContent({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <JobForm jobId={params.id} />
    </AdminLayout>
  );
}

// Page component that satisfies Next.js types
export default function Page({ params }: PageProps) {
  return <EditJobContent params={params} />;
}

export const metadata: Metadata = {
  title: 'Edit Job',
};