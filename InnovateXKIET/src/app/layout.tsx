"use client";

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Leaderboard } from '@/components/leaderboard';
import Header from '@/components/header';
import HeaderMobile from '@/components/header-mobile';
import SideNav from '@/components/side-nav';
import { Providers } from './provider';
import ReduxProvider from '@/context/ReduxProvider';
import { AuthProvider, useAuth } from '@/context/authProvider';
import { usePathname } from 'next/navigation';
import ReduxPersister from '@/context/reduxPersister';
import bgImage from '@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg';
import LandingPage from './landingPage/page';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/user/login' || pathname === '/user/signup' ||
  pathname === "/user/afterEmailVerification";

  return (
    <html lang="en">
      <body className={`bg-white dark:bg-gray-900 text-gray-950 ${inter.className}`}>
        <ReduxProvider>
          <AuthProvider>
            <ReduxPersister>
              <Providers>
                <AuthContentWrapper isLoginPage={isLoginPage} children={children} />
              </Providers>
            </ReduxPersister>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

function AuthContentWrapper({ isLoginPage, children }: { isLoginPage: boolean; children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const isFeedsPage = pathname === '/user/feeds';

  return (
    <div>
      {/* Conditionally render components based on route */}
      {!isAuthenticated && !isLoginPage ? (
        <LandingPage />
      ) : (
        <>
          {!isLoginPage && (
            <>
              <aside className="w-1/4">
                <SideNav />
              </aside>
              <Header />
              <HeaderMobile />
            </>
          )}
          <main
            className={`flex justify-center items-center ${isLoginPage ? 'min-h-screen' : 'h-full'}`}
            style={{
              backgroundImage: !isAuthenticated || isLoginPage ? `url(${bgImage.src})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {isLoginPage ? (
              <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                {children}
              </div>
            ) : (
              <div
                className={
                  isFeedsPage
                    ? "flex flex-col lg:mr-96 md:ml-60 md:mr-60 sm:border-zinc-700 dark:border-zinc-700"
                    : "flex flex-col lg:ml-100 md:ml-60 sm:border-zinc-700 dark:border-zinc-700"
                }
              >
                {children}
              </div>
            )}
          </main>
        </>
      )}

      {/* Render Leaderboard only on the feeds page */}
      {isAuthenticated && isFeedsPage && (
        <div className="hidden lg:block fixed right-0 top-0 h-full w-1/4 p-4 bg-gray-200 dark:bg-gray-800 z-10">
          <Leaderboard />
        </div>
      )}
    </div>
  );
}
