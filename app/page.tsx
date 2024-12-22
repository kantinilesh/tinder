import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BriefcaseIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Find Your Perfect Match
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with opportunities or talent using our innovative matching platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <BriefcaseIcon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">For Recruiters</h2>
              <p className="text-muted-foreground">
                Find the perfect candidates for your positions with our AI-powered matching system
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/signup?role=recruiter">Get Started</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">For Job Seekers</h2>
              <p className="text-muted-foreground">
                Discover opportunities that match your skills and preferences
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/signup?role=employee">Get Started</Link>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Already have an account?</p>
          <Button variant="outline" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}