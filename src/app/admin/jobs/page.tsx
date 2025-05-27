import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobsManagement from '@/components/adminpanel/JobsManagements';

export default function AdminJobsPage() {
  return (
    <AdminLayout>
      <JobsManagement />
    </AdminLayout>
  );
}