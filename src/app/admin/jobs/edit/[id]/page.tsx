import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';

interface PageProps {
  params: { id: string };
}

export default function AdminEditJobPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <JobForm jobId={params.id} />
    </AdminLayout>
  );
}
