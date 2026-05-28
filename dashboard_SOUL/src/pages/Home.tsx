import { DashboardLayout } from "../components/DashboardLayout"
import { StatsCards } from "../components/StatsCards"
import { AgendaCard } from "../components/AgendaCard"
import { ReportCard } from "../components/ReportCard"
import { ShortcutsCard } from "../components/ShortcutsCard"
import { BottomSectionCard } from "../components/BottomSectionCard"

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
