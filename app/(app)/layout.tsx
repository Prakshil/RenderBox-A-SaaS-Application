"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  CloudIcon,
  XIcon,
  Eraser,
  Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";

const sidebarItems = [
  { href: "/video-upload", icon: UploadIcon, label: "Upload Video" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/background-removal", icon: Eraser, label: "Background Removal" },
  { href: "/ai-enhancer", icon: Sparkles, label: "AI Enhancer" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="drawer lg:drawer-open flex-1">
        <input
          id="sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-40 backdrop-blur-lg bg-opacity-95">
            <div className="max-w-7xl mx-auto w-full px-4">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="sidebar-drawer"
                  className="btn btn-square btn-ghost drawer-button"
                >
                  <MenuIcon className="w-6 h-6" />
                </label>
              </div>
              <div className="flex-1">
                <Link href="/" onClick={handleLogoClick}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <CloudIcon className="w-8 h-8 text-primary" />
                    <span className="font-display font-bold text-xl hidden sm:inline">
                      RenderBox
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="grow bg-base-100">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-50">
          <label
            htmlFor="sidebar-drawer"
            className="drawer-overlay"
            aria-label="close sidebar"
          ></label>
          <aside className="bg-base-200 w-72 min-h-full flex flex-col border-r border-base-300">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <div className="flex items-center gap-2">
                <CloudIcon className="w-8 h-8 text-primary" />
                <span className="font-display font-bold text-lg">Dashboard</span>
              </div>
              <button
                className="btn btn-ghost btn-sm btn-circle lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <ul className="menu p-4 grow">
              <li className="menu-title">
                <span className="text-xs font-semibold">Navigation</span>
              </li>
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 py-3 ${
                      pathname === item.href
                        ? "active bg-primary text-primary-content"
                        : ""
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Info in Sidebar */}
            {user && (
              <div className="p-4 border-t border-base-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={user.imageUrl} alt={user.username || "User"} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {user.username || user.firstName || "User"}
                    </div>
                    <div className="text-xs text-base-content/60 truncate">
                      {user.emailAddresses[0]?.emailAddress}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-error btn-sm w-full"
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}