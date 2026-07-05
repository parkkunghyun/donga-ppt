import { Header } from "@/components/header";
import { AdminPanel } from "@/components/admin-panel";

export const metadata = {
  title: "관리자 | AX 성과 공유",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <AdminPanel />
      </main>
    </>
  );
}
