import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthed()) redirect("/admin/login");

  return (
    <div className="mx-auto grid min-h-screen max-w-[1200px] grid-cols-1 gap-6 p-5 md:grid-cols-[220px_1fr]">
      <aside className="card-base h-fit bg-white p-4 md:sticky md:top-5">
        <div className="px-2 font-serif text-lg font-extrabold">
          Harshit<span className="text-teal-deep">.</span>Gupta
        </div>
        <div className="mb-4 px-2 text-xs text-muted">Admin panel</div>
        <AdminNav />
        <div className="mt-4 border-t border-line pt-4">
          <Link
            href="/"
            target="_blank"
            className="mb-2 block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-teal-deep"
          >
            View site
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  );
}
