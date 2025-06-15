import AdminLayout from '@/components/adminpanel/AdminLayout';
import TestimonialForm from '@/components/adminpanel/TestimonialForm';

export default async function AdminEditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params to get the actual values
  const { id } = await params;
  
  return (
    <AdminLayout>
      <TestimonialForm testimonialId={id} />
    </AdminLayout>
  );
}