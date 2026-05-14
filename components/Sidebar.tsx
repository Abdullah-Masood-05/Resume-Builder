"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegFileAlt, FaUser, FaBriefcase, FaFileAlt, FaSignOutAlt, FaCheckCircle } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const sidebarRef = useRef<HTMLElement>(null);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Collapse sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        if (!collapsed) {
          setCollapsed(true);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed]);

  // Hide sidebar on auth pages
  if (pathname === "/auth/login" || pathname === "/auth/register") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Role-based navigation
  const getNavItems = () => {
    if (!user) return [];

    if (user.role === "recruiter") {
      return [
        { href: "/dashboard", icon: <FaUser />, label: "Dashboard" },
        { href: "/recruiter/jobs", icon: <FaRegFileAlt />, label: "My Jobs" },
      ];
    } else {
      return [
        { href: "/dashboard", icon: <FaUser />, label: "Dashboard" },
        { href: "/candidate/jobs", icon: <FaBriefcase />, label: "Browse Jobs" },
        { href: "/candidate/applications", icon: <FaCheckCircle />, label: "My Applications" },
        { href: "/resume", icon: <HiTemplate />, label: "Build Resume" },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 flex flex-col z-50 ${collapsed ? "w-20" : "w-64"
          }`}
      >
        {/* Header */}
        <div className={`px-4 py-5 border-b border-gray-200 ${collapsed ? "flex flex-col items-center gap-3" : "flex items-center justify-between"}`}>
          {collapsed ? (
            <>
              <FaRegFileAlt className="text-2xl text-orange-500 shrink-0" />
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-2xl text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Expand sidebar"
              >
                <IoMenu />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 overflow-hidden">
                <FaRegFileAlt className="text-2xl text-orange-500 shrink-0" />
                <h1 className="font-bold text-xl text-gray-900 whitespace-nowrap">
                  Resume Builder
                </h1>
              </div>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-2xl text-gray-600 hover:text-orange-500 transition-colors shrink-0"
                aria-label="Collapse sidebar"
              >
                <IoClose />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
              active={pathname === item.href}
              isResumePath={pathname === "/resume"}
            />
          ))}
        </nav>

        {/* User Info & Logout */}
        {mounted && user && (
          <div className="px-3 py-4 border-t border-gray-200">
            {!collapsed && (
              <div className="mb-3 px-2">
                <p className="text-xs text-gray-500 mb-1">Logged in as</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{user.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-all ${collapsed ? "justify-center" : ""
                }`}
            >
              <FaSignOutAlt className="text-lg shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <p
            className={`text-xs text-gray-500 text-center transition-all duration-300 ${collapsed ? "opacity-0" : "opacity-100"
              }`}
          >
            © {new Date().getFullYear()} Resume Builder
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"
          }`}
      >
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  collapsed,
  active,
  isResumePath,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
  isResumePath?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${active && !isResumePath
        ? "bg-orange-50 text-orange-600 border border-orange-200"
        : isResumePath
          ? "text-gray-500" // Different styling for resume path
          : "text-gray-700 hover:bg-gray-100 hover:text-orange-600"
        } ${collapsed ? "justify-center" : ""}`}
    >
      <div className="text-[28px] shrink-0">{icon}</div>
      <span
        className={`whitespace-nowrap transition-all duration-300 ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}
      >
        {label}
      </span>
    </Link>
  );
}