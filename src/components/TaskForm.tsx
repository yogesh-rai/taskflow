import { FormEvent, useState } from 'react'

type TaskFormProps = { onAddTask: (title: string, description: string) => void }

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setTitleError('Please enter a task title.')
      return
    }
    onAddTask(cleanTitle, description.trim())
    setTitle('')
    setDescription('')
    setTitleError('')
  }

  return (
    <form className="task-form" noValidate onSubmit={handleSubmit}>
      <div className="form-heading">
        <div className="form-icon" aria-hidden="true">✦</div>
        <div>
          <h2>Create a task</h2>
          <p>Capture what needs your attention next.</p>
        </div>
      </div>
      <label htmlFor="task-title">Task title</label>
      <input id="task-title" value={title} onChange={(event) => { setTitle(event.target.value); if (titleError) setTitleError('') }} placeholder="e.g. Prepare weekly report" aria-invalid={Boolean(titleError)} aria-describedby={titleError ? 'task-title-error' : undefined} required />
      {titleError && <p className="validation-message" id="task-title-error" role="alert">{titleError}</p>}
      <label htmlFor="task-description">Description <span>(optional)</span></label>
      <textarea id="task-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add a little more context..." rows={3} />
      <button className="primary-button" type="submit"><span aria-hidden="true">+</span> Add task</button>
    </form>
  )
}
