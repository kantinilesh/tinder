import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Chat } from '@/components/dashboard/chat';

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { job?: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: job } = await supabase
    .from('jobs')
    .select('*, profiles:recruiter_id(*)')
    .eq('id', searchParams.job)
    .single();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      {job && (
        <Chat
          currentUserId={session?.user.id!}
          otherUserId={job.recruiter_id}
          jobId={job.id}
        />
      )}
    </div>
  );
}