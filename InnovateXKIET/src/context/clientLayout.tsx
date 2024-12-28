"use client"
import { usePathname } from 'next/navigation';
import { Leaderboard } from '@/components/leaderboard';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {children}
      {pathname === '/feed' && (
        <div className="md:w-60 fixed right-0 top-0 h-full p-4 bg-gray-200 dark:bg-gray-800 -z-10">
          <Leaderboard />
        </div>
      )}
    </>
  );
}
