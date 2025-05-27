import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';

export default async function AdminEditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params to get the actual values
  const { id } = await params;
  
  return (
    <AdminLayout>
      <JobForm jobId={id} />
    </AdminLayout>
  );
}