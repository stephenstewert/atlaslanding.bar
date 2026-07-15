import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="admin-login">
      <section className="admin-login-brand">
        <div className="admin-brand">
          <Image src="/atlas-arrow.svg" alt="" width={20} height={25} />
          <span>Atlas Landing</span>
        </div>
        <p>The bar menu, connected directly to Clover.</p>
      </section>
      <section className="admin-login-panel">
        <LoginForm />
      </section>
    </main>
  );
}
