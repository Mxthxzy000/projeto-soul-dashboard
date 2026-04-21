"use client"

const shipments = [
  {
    id: "TN-003",
    date: "22/04/2024",
    carrier: "Transportadora Rápido",
    destination: "Loja Sto Pa...",
    status: "Em trânsito",
    statusColor: "bg-[#e67e22]",
  },
  {
    id: "TN-022",
    date: "20/04/2024",
    carrier: "Transportadora Velox",
    destination: "Distribuid. Mena",
    status: "Em trânsito",
    statusColor: "bg-[#e67e22]",
  },
  {
    id: "TN-001",
    date: "16/04/2024",
    carrier: "Transportadora Expressa",
    destination: "Eltai Rij...",
    status: "Entregue",
    statusColor: "bg-[#10b981]",
  },
  {
    id: "TN-000",
    date: "15/04/2024",
    carrier: "Transportadora Sul",
    destination: "Loja Centro",
    status: "Entregue",
    statusColor: "bg-[#10b981]",
  },
]

export function TransitCard() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Em Trânsito</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-2 text-left font-medium text-gray-500">Data</th>
              <th className="pb-2 text-left font-medium text-gray-500">Transportadora</th>
              <th className="pb-2 text-left font-medium text-gray-500">Destino</th>
              <th className="pb-2 text-left font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
              <tr
                key={shipment.id}
                className="group border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="py-2">
                  <span className="text-xs text-gray-500">{shipment.id}</span>
                  <p className="font-medium text-gray-900">{shipment.date}</p>
                </td>
                <td className="py-2 text-gray-700">{shipment.carrier}</td>
                <td className="py-2 text-gray-700">{shipment.destination}</td>
                <td className="py-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium text-white ${shipment.statusColor}`}
                  >
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
