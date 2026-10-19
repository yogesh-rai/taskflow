import { useMemo, useState } from 'react'
import { TaskForm } from './components/TaskForm'
import { StatusFilter, TaskList } from './components/TaskList'
import { TaskStats } from './components/TaskStats'
import { Task } from './types'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const stats = useMemo(() => ({ total: tasks.length, completed: tasks.filter((task) => task.completed).length, pending: tasks.filter((task) => !task.completed).length }), [tasks])
  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesTitle = task.title.toLowerCase().includes(normalizedQuery)
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'completed' ? task.completed : !task.completed)
      return matchesTitle && matchesStatus
    })
  }, [searchQuery, statusFilter, tasks])

  function addTask(title: string, description: string) {
    setTasks((current) => [{ id: crypto.randomUUID(), title, description, completed: false }, ...current])
  }
  function toggleTask(id: string) { setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)) }
  function deleteTask(id: string) { setTasks((current) => current.filter((task) => task.id !== id)) }

  return <div className="app-shell"><header className="app-header"><a className="brand" href="/" aria-label="TaskFlow home"><span className="brand-mark">✓</span><span>Task<span>Flow</span></span></a><div className="header-date"><span className="pulse" aria-hidden="true" /> Focus mode <span className="date-divider" /> {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())}</div></header><main><section className="hero"><div><p className="eyebrow">Good morning, let's make progress</p><h1>Make space for<br /><em>what matters.</em></h1><p className="hero-copy">A simple place to organize your day, one meaningful task at a time.</p></div><div className="hero-mark" aria-hidden="true"><span>✦</span></div></section><TaskStats {...stats} /><div className="dashboard-grid"><TaskForm onAddTask={addTask} /><TaskList tasks={filteredTasks} totalTasks={tasks.length} searchQuery={searchQuery} statusFilter={statusFilter} onSearchChange={setSearchQuery} onStatusChange={setStatusFilter} onToggle={toggleTask} onDelete={deleteTask} /></div></main><footer>TaskFlow <span>•</span> Keep moving forward.</footer></div>
}
