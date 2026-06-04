"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/posts", label: "Blog Posts" },
  { href: "/admin/posts/new", label: "New Post" },
  { href: "/admin/leads", label: "Leads" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {links.map((l) => {
        const active = l.exact
          ? pathname === l.href
          : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-navy text-white"
                : "text-muted hover:bg-teal-soft hover:text-teal-deep"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
