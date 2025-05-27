import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';

type PageProps = {
  params: { id: string };
};

export default function AdminEditJobPage({ params }: PageProps) {
  return (
    <AdminLayout>
      <JobForm jobId={params.id} />
    </AdminLayout>
  );
}
