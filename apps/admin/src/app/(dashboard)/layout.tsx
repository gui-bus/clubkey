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
    <div className="flex flex-col xl:flex-row flex-1 w-full min-h-screen bg-background text-foreground">
      <AdminSidebar defaultCollapsed={defaultCollapsed} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden flex flex-col min-w-0 w-full">
        {children}
      </main>
    </div>
  )
}
