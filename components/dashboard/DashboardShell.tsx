'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ExternalLink, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DASHBOARD_NAV,
  dashboardNavLabel,
  dashboardPathMatches,
  dashboardWelcomeMessage,
} from '@/components/dashboard/dashboardNav';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const welcomeLine = dashboardWelcomeMessage(pathname);

  const closeMobile = () => setMobileOpen(false);

  const sidebar = (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 flex h-screen w-70 lg:w-56 shrink-0 flex-col bg-black text-white',
        'max-lg:z-100 max-lg:shadow-xl',
        'max-lg:transition-transform max-lg:duration-400',
        mobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 outline-0"
          onClick={closeMobile}
        >
          <Image
            src="/assets/svgs/Hosperra-white.svg"
            alt="Hospyra"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
          onClick={closeMobile}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {DASHBOARD_NAV.map(({ href, label, icon: Icon }) => {
          const active = dashboardPathMatches(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              onClick={closeMobile}
              className={cn(
                'flex items-center gap-3 rounded-md p-3 text-sm font-medium font-effra transition-colors',
                active
                  ? 'bg-[#1E50C1] text-white'
                  : 'text-white hover:bg-white/10'
              )}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-95" />
              <span className="leading-snug truncate ">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 px-3 py-1">
        <Link
          href="/"
          onClick={closeMobile}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium font-effra text-white/90 hover:bg-white/10"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          Marketing site
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full bg-black md:min-h-[calc(100vh-5rem)]">
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-90 bg-black/50 lg:hidden"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}

      {sidebar}

      <div className="flex min-w-0 flex-1 flex-col lg:ml-56 rounded-tl-4xl">

        <div className="sticky top-0 z-30 pt-2 bg-black">
          <header className="flex h-16 rounded-tl-[40px] items-center justify-between gap-3 bg-white px-4 md:h-18 md:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                className="shrink-0 rounded-lg p-2 text-[#27272A] hover:bg-gray-100 lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>

              <h1 className="truncate text-xl font-bold text-[#27272A] font-effra md:text-2xl">
                {dashboardNavLabel(pathname)}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Bell size={20} />
              <div className="flex h-9 w-9 ml-5 items-center justify-center rounded-full bg-[#1E50C1]/15 text-sm font-semibold text-[#1E50C1] font-effra">
                H
              </div>
              <span className="hidden text-sm text-black sm:inline">
                Alex Chen
              </span>

            </div>
          </header>
        </div>

        <main className="flex-1 overflow-auto bg-white px-4 md:px-6">
          <p className="text-sm text-[#52525b] font-effra md:text-base">
            {welcomeLine}
          </p>
          <div className="py-4">{children}</div>
        </main>
      </div>
    </div>
  );
}