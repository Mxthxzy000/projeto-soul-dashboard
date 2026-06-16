import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <Sidebar />
      <div className="ml-[200px] flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
        <footer className="border-t border-gray-200 bg-[#f8f5f0] py-4 text-center text-sm text-gray-500">
          ©2026 BitLayer. Todos os direitos reservados. | Caçapava-SP
        </footer>
      </div>
    </div>
  )
}
