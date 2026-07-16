import { getAdminSession } from "@/lib/admin-auth";
import { loadCloverMenu } from "@/lib/clover-menu";
import { generateMenuPdf } from "@/lib/menu-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return Response.json({ error: "Your session has expired." }, { status: 401 });
  }
  try {
    const bytes = await generateMenuPdf(await loadCloverMenu({ bootstrap: true }));
    return new Response(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="atlas-landing-menu.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation failed", error);
    return Response.json({ error: "The PDF could not be generated." }, { status: 500 });
  }
}
