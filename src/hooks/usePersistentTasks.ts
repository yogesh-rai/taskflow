import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Task } from '../types'

export const TASKS_STORAGE_KEY = 'taskflow.tasks.v1'
const STORAGE_VERSION = 1

type StoredTasks = { version: typeof STORAGE_VERSION; tasks: unknown }

function isValidTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') return false
  const task = value as Partial<Task>
  return typeof task.id === 'string' && task.id.trim().length > 0 && typeof task.title === 'string' && task.title.trim().length > 0 && typeof task.description === 'string' && typeof task.completed === 'boolean'
}

function loadTasks(): Task[] {
  try {
    const rawValue = window.localStorage.getItem(TASKS_STORAGE_KEY)
    if (!rawValue) return []
    const storedValue = JSON.parse(rawValue) as Partial<StoredTasks>
    if (storedValue.version !== STORAGE_VERSION || !Array.isArray(storedValue.tasks)) return []
    return storedValue.tasks.filter(isValidTask).map((task) => ({ ...task, title: task.title.trim(), description: task.description.trim() }))
  } catch {
    return []
  }
}

export function usePersistentTasks(): [Task[], Dispatch<SetStateAction<Task[]>>] {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, tasks }))
    } catch {
      // Task management remains available for the current session without storage.
    }
  }, [tasks])

  return [tasks, setTasks]
}
