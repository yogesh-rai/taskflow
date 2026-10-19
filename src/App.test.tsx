import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

beforeEach(() => { vi.stubGlobal('crypto', { randomUUID: () => 'test-task-id' }) })

describe('TaskFlow', () => {
  it('renders the dashboard and empty state', () => { render(<App />); expect(screen.getByRole('heading', { name: /make space/i })).toBeInTheDocument(); expect(screen.getByText(/clear desk/i)).toBeInTheDocument() })
  it('adds a task with an optional description', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText(/task title/i), 'Plan launch'); await user.type(screen.getByLabelText(/description/i), 'Outline the next steps'); await user.click(screen.getByRole('button', { name: /add task/i })); expect(screen.getByRole('heading', { name: 'Plan launch' })).toBeInTheDocument(); expect(screen.getByText('Outline the next steps')).toBeInTheDocument(); expect(screen.getByRole('region', { name: /task statistics/i })).toHaveTextContent('Total tasks1') })
  it('toggles a task between pending and completed', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText(/task title/i), 'Review PR'); await user.click(screen.getByRole('button', { name: /add task/i })); await user.click(screen.getByRole('button', { name: /complete review pr/i })); expect(screen.getByRole('button', { name: /mark review pr/i })).toHaveTextContent('✓'); expect(screen.getByText('0', { selector: 'strong' })).toBeInTheDocument() })
  it('deletes a task', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText(/task title/i), 'Remove me'); await user.click(screen.getByRole('button', { name: /add task/i })); await user.click(screen.getByRole('button', { name: /delete remove me/i })); expect(screen.queryByRole('heading', { name: 'Remove me' })).not.toBeInTheDocument() })
})
