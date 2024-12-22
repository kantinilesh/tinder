'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BriefcaseIcon, MessageSquareIcon, UserIcon } from 'lucide-react';
import { signOut } from '@/lib/supabase/auth';
import { useToast } from '@/hooks/use-toast';

export function DashboardNavbar({ user }: { user: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/signin');
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error signing out',
        description: error.message,
      });
    }
  };

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: BriefcaseIcon,
    },
    {
      href: '/dashboard/matches',
      label: 'Matches',
      icon: UserIcon,
    },
    {
      href: '/dashboard/messages',
      label: 'Messages',
      icon: MessageSquareIcon,
    },
  ];

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 ${
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline-block">{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
                  <AvatarFallback>
                    {user?.full_name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}