import { Task } from '../types'

type TaskItemProps = { task: Task; onToggle: (id: string) => void; onDelete: (id: string) => void }

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <button className="check-button" type="button" aria-label={`${task.completed ? 'Mark' : 'Complete'} ${task.title}`} onClick={() => onToggle(task.id)}>{task.completed ? '✓' : ''}</button>
      <div className="task-copy"><h3>{task.title}</h3>{task.description && <p>{task.description}</p>}</div>
      <button className="delete-button" type="button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}>×</button>
    </li>
  )
}
