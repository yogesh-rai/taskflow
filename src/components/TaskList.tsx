import { Task } from '../types'
import { TaskItem } from './TaskItem'

type TaskListProps = { tasks: Task[]; onToggle: (id: string) => void; onDelete: (id: string) => void }

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <section className="task-list-panel" aria-labelledby="tasks-heading">
      <div className="section-heading"><div><p className="eyebrow">Your workspace</p><h2 id="tasks-heading">All tasks <span>{tasks.length}</span></h2></div><span className="list-caption">{tasks.length ? 'Sorted by recently added' : 'Nothing here yet'}</span></div>
      {tasks.length ? <ul className="task-list">{tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)}</ul> : <div className="empty-state"><div className="empty-illustration" aria-hidden="true">✓</div><h3>A clear desk is a clear mind.</h3><p>Add your first task to get the ball rolling.</p></div>}
    </section>
  )
}
