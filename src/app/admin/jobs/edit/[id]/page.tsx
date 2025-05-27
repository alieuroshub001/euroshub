import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export default function AdminEditJobPage({ params }: PageProps) {
  return (
    <AdminLayout>
      <JobForm jobId={params.id} />
    </AdminLayout>
  );
}