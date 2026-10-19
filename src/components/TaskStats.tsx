type TaskStatsProps = { total: number; completed: number; pending: number }

export function TaskStats({ total, completed, pending }: TaskStatsProps) {
  return (
    <section className="stats-grid" aria-label="Task statistics">
      <div className="stat-card total"><span className="stat-label">Total tasks</span><strong>{total}</strong><span className="stat-note">All your tasks</span></div>
      <div className="stat-card completed"><span className="stat-label">Completed</span><strong>{completed}</strong><span className="stat-note">Keep it up!</span></div>
      <div className="stat-card pending"><span className="stat-label">Pending</span><strong>{pending}</strong><span className="stat-note">On your radar</span></div>
    </section>
  )
}
