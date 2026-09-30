import { cookies } from "next/headers"

import { AdminSidebar } from "@/src/components/admin/adminSidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultCollapsed =
    cookieStore.get("clubkey_admin_sidebar_collapsed")?.value === "true"

  return (
    <div className="flex flex-col md:flex-row flex-1 w-full min-h-screen bg-background text-foreground">
      
      <AdminSidebar defaultCollapsed={defaultCollapsed} />

      
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  )
}
