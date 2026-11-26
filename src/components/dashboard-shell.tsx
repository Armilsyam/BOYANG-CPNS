"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Compass,
  FileSearch,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { authClient } from "@/lib/auth-client";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/formasi", label: "304 Formasi PDF", icon: FileSearch },
  { href: "/dashboard/materi", label: "Materi SKD & PDF", icon: BookOpen },
  { href: "/dashboard/tryout", label: "Tryout CAT", icon: Timer },
  { href: "/dashboard/panduan", label: "Panduan & Info", icon: Compass },
];

export function DashboardShell({
  userName,
  userEmail,
  accessCode,
  isAdmin = false,
  children,
}: {
  userName: string;
  userEmail: string;
  accessCode: string | null;
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <BrandLogo href="/dashboard" />

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2.5 py-1 text-[11px] font-black text-amber-900 hover:bg-amber-200"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin QRIS
              </Link>
            )}
            {accessCode && (
              <span className="hidden md:inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-800">
                ID: {accessCode}
              </span>
            )}
            <div className="hidden sm:block text-right leading-tight">
              <p className="text-xs font-extrabold text-slate-900">{userName}</p>
              <p className="text-[11px] text-slate-500">{userEmail}</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Sub-nav bar */}
        <div className="border-t border-slate-100 bg-slate-50/70">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                    active
                      ? "bg-[#0B2A52] text-white shadow-xs"
                      : "text-slate-600 hover:bg-white hover:text-[#0B2A52]"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-amber-400" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
