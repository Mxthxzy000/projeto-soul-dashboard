import { cn } from "../../lib/utils"

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
            activeTab === tab.id
              ? "bg-[#e67e22] text-white"
              : "border border-gray-300 bg-white text-gray-600 hover:border-[#e67e22] hover:text-[#e67e22]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

/* Tabs alternativas com estilo de underline */
export function TabsUnderline({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn("border-b border-gray-200", className)}>
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-[#e67e22]"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#e67e22]" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
