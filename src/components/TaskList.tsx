import { Task } from '../types'
import { TaskItem } from './TaskItem'

export type StatusFilter = 'all' | 'completed' | 'pending'

type TaskListProps = {
  tasks: Task[]
  totalTasks: number
  searchQuery: string
  statusFilter: StatusFilter
  onSearchChange: (query: string) => void
  onStatusChange: (status: StatusFilter) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, totalTasks, searchQuery, statusFilter, onSearchChange, onStatusChange, onToggle, onDelete }: TaskListProps) {
  const hasActiveFilters = Boolean(searchQuery.trim()) || statusFilter !== 'all'

  return (
    <section className="task-list-panel" aria-labelledby="tasks-heading">
      <div className="task-filters" aria-label="Task filters">
        <label className="search-field" htmlFor="task-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search tasks by title</span><input id="task-search" type="search" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search tasks..." /></label>
        <label className="status-field" htmlFor="status-filter"><span className="sr-only">Filter tasks by status</span><select id="status-filter" value={statusFilter} onChange={(event) => onStatusChange(event.target.value as StatusFilter)}><option value="all">All</option><option value="completed">Completed</option><option value="pending">Pending</option></select></label>
      </div>
      <div className="section-heading"><div><p className="eyebrow">Your workspace</p><h2 id="tasks-heading">All tasks <span>{tasks.length}</span></h2></div><span className="list-caption">{tasks.length ? 'Sorted by recently added' : 'Nothing here yet'}</span></div>
      {tasks.length ? <ul className="task-list">{tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)}</ul> : <div className="empty-state">{totalTasks && hasActiveFilters ? <><div className="empty-illustration" aria-hidden="true">⌕</div><h3>No tasks match your filters.</h3><p>Try a different search or status.</p></> : <><div className="empty-illustration" aria-hidden="true">✓</div><h3>A clear desk is a clear mind.</h3><p>Add your first task to get the ball rolling.</p></>}</div>}
    </section>
  )
}
