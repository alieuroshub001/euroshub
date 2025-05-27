import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';


export default function AdminEditJobPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <JobForm jobId={params.id} />
    </AdminLayout>
  );
}
