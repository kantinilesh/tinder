import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function MatchesPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: matches } = await supabase
    .from('matches')
    .select(`
      *,
      jobs (*),
      profiles:jobs(recruiter_id(*))
    `)
    .eq('user_id', session?.user.id)
    .eq('status', 'matched');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Matches</h1>
      <div className="grid gap-6">
        {matches?.map((match) => (
          <Card key={match.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{match.jobs.title}</h3>
                <p className="text-muted-foreground">{match.jobs.company}</p>
              </div>
              <Button asChild>
                <Link href={`/dashboard/messages?job=${match.job_id}`}>
                  Message Recruiter
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}