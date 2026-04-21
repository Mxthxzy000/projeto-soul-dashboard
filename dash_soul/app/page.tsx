import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { AgendaCard } from "@/components/dashboard/agenda-card"
import { ReportCard } from "@/components/dashboard/report-card"
import { ShortcutsCard } from "@/components/dashboard/shortcuts-card"
import { BottomSectionCard } from "@/components/dashboard/bottom-section-card"

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <StatsCards />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <AgendaCard />
          <ReportCard />
          <ShortcutsCard />
        </div>

        {/* Bottom Section - Financeiro, Em Trânsito, Estoque */}
        <BottomSectionCard />
      </div>
    </DashboardLayout>
  )
}
