import { useState } from 'react'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const events = [
  { id: 1, time: '08:00', title: 'Abertura do Expediente', date: 'Segunda-feira, 22 abril', type: 'daily' },
  { id: 2, time: '10:00', title: 'Reunião com equipe de produção', date: 'Terça-feira, 24 abril', type: 'meeting' },
  { id: 3, time: '13:00', title: 'Auditoria da contabilidade', date: 'Terça-feira, 24 abril', type: 'audit' },
  { id: 4, time: '09:00', title: 'Treinamento de segurança', date: 'Quarta-feira, 25 abril', type: 'training' },
  { id: 5, time: '14:00', title: 'Revisão de metas trimestrais', date: 'Quinta-feira, 26 abril', type: 'meeting' },
  { id: 6, time: '11:00', title: 'Entrevista com candidatos', date: 'Sexta-feira, 27 abril', type: 'interview' },
]

const daysWithEvents = [22, 24, 25, 26, 27]

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const filteredEvents = selectedDate
    ? events.filter((e) => e.date.includes(selectedDate.toString()))
    : events

  return (
    <DashboardLayout>
      <div>
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Agenda</h1>
            <p className="page-subtitle">Gerencie seus eventos e compromissos</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Evento
          </button>
        </div>

        <div className="grid-2">
          {/* Mini Calendar */}
          <div className="card">
            <h2 className="card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="2" width="18" height="18" style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }}>
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Abril 2024
            </h2>

            {/* Days of week */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 4 }}>
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
                <div key={d} style={{ fontSize: '0.7rem', color: '#888', paddingBottom: 4, fontWeight: 500 }}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(selectedDate === day ? null : day)}
                  style={{
                    padding: '6px 2px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: daysWithEvents.includes(day) ? 600 : 400,
                    background: selectedDate === day
                      ? '#E67E22'
                      : daysWithEvents.includes(day)
                        ? 'rgba(230,126,34,0.15)'
                        : 'transparent',
                    color: selectedDate === day ? 'white' : daysWithEvents.includes(day) ? '#E67E22' : '#555',
                    transition: 'all 0.15s',
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                style={{ marginTop: 12, fontSize: '0.8rem', color: '#888', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
              >
                Limpar filtro
              </button>
            )}
          </div>

          {/* Events List */}
          <div className="card">
            <h2 className="card-title">
              {selectedDate ? `Eventos — dia ${selectedDate}` : 'Próximos Eventos'}
            </h2>

            {filteredEvents.length === 0 && (
              <p style={{ color: '#aaa', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                Nenhum evento nesta data.
              </p>
            )}

            {filteredEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-time-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="2" width="14" height="14">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '0.875rem' }}>{event.title}</p>
                  <p style={{ fontSize: '0.78rem', color: '#888', marginTop: 2 }}>{event.date}</p>
                </div>
                <button className="btn-secondary" style={{ fontSize: '0.75rem' }}>Editar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
