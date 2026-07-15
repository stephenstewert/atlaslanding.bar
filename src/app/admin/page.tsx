import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { cloverConfigured } from "@/lib/clover";
import { MenuManager } from "./menu-manager";

export default async function AdminPage() {
  if (!(await getAdminSession())) redirect("/admin/login");

  return (
    <main className="admin-workspace">
      <header className="admin-topbar">
        <div className="admin-brand">
          <Image src="/atlas-arrow.svg" alt="" width={20} height={25} />
          <span>Atlas Landing</span>
        </div>
        <div className="admin-top-actions">
          <span className="admin-connection"><i /> {cloverConfigured() ? "Clover connected" : "Clover setup needed"}</span>
          <form action="/api/admin/logout" method="post"><button className="admin-signout" type="submit">Sign out</button></form>
        </div>
      </header>
      <MenuManager />
    </main>
  );
}
