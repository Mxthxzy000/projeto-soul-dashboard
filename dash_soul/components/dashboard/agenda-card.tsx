"use client"

import Link from "next/link"

const events = [
  {
    time: "10:00",
    title: "Reunião com equipe de produção",
    date: "Terça-feira, 24 abril",
  },
  {
    time: "13:00",
    title: "Auditoria da contabilidade",
    date: "Terça-feira, 24 abril",
  },
  {
    time: "09:00",
    title: "Treinamento de segurança",
    date: "Quarta-feira, 25 abril",
  },
]

export function AgendaCard() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Agenda</h2>
      
      <div className="flex-1 space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="group flex items-start gap-4 rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-[#e67e22]/30 hover:bg-orange-50/50"
          >
            <div className="flex flex-col items-center border-r border-gray-200 pr-4">
              <span className="text-lg font-bold text-gray-900">{event.time}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 transition-colors group-hover:text-[#e67e22]">
                {event.title}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/agenda"
        className="mt-auto block w-full rounded-lg bg-[#e67e22] py-2.5 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
      >
        Ver Agenda Completa
      </Link>
    </div>
  )
}
