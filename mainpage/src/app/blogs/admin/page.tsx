import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/db";
import { NavBar } from "@/app/temp/components/NavBar";
import AdminForm from "./AdminForm";

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId || !isAdmin(userId)) redirect("/blogs");

  const user = await currentUser();

  return (
    <main className="min-h-screen bg-[#080808]">
      <NavBar />
      <div className="max-w-3xl mx-auto px-6 py-24 md:px-12">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/25 mb-3">Admin</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">New Post</h1>
          <p className="mt-1 text-sm text-white/35">
            Writing as{" "}
            <span className="text-white/60">
              {user?.firstName ?? "Billy"}
            </span>
          </p>
        </div>
        <div className="h-px bg-linear-to-r from-[#818cf8]/30 via-[#a855f7]/30 to-[#ec4899]/30 mb-10" />
        <AdminForm />
      </div>
    </main>
  );
}
