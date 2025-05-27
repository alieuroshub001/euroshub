import AdminLayout from '@/components/adminpanel/AdminLayout';
import JobForm from '@/components/adminpanel/JobForm';
import { Metadata } from 'next';

type PageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function AdminEditJobPage({ params }: PageProps) {
  return (
    <AdminLayout>
      <JobForm jobId={params.id} />
    </AdminLayout>
  );
}

export const metadata: Metadata = {
  title: 'Edit Job',
};

// Workaround for Next.js type expectation
export default function Page(props: any) {
  return <AdminEditJobPage {...props} />;
}