"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="w-full rounded-lg border border-line px-3 py-2 text-left text-sm font-medium text-muted transition hover:border-teal-deep hover:text-teal-deep"
    >
      Sign out
    </button>
  );
}
