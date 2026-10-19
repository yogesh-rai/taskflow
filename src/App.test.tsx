import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

beforeEach(() => {
  vi.stubGlobal('crypto', { randomUUID: () => 'test-task-id' })
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  window.localStorage.clear()
})
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); document.documentElement.removeAttribute('data-theme') })

describe('TaskFlow', () => {
  it('renders the dashboard and empty state', () => { render(<App />); expect(screen.getByRole('heading', { name: /make space/i })).toBeInTheDocument(); expect(screen.getByText(/clear desk/i)).toBeInTheDocument() })
  it('adds a task with an optional description', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText(/task title/i), 'Plan launch'); await user.type(screen.getByLabelText(/description/i), 'Outline the next steps'); await user.click(screen.getByRole('button', { name: /add task/i })); expect(screen.getByRole('heading', { name: 'Plan launch' })).toBeInTheDocument(); expect(screen.getByText('Outline the next steps')).toBeInTheDocument(); expect(screen.getByRole('region', { name: /task statistics/i })).toHaveTextContent('Total tasks1') })
  it('toggles a task between pending and completed', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText(/task title/i), 'Review PR'); await user.click(screen.getByRole('button', { name: /add task/i })); await user.click(screen.getByRole('button', { name: /complete review pr/i })); expect(screen.getByRole('button', { name: /mark review pr/i })).toHaveTextContent('✓'); expect(screen.getByText('0', { selector: 'strong' })).toBeInTheDocument() })
  it('deletes a task', async () => { const user = userEvent.setup(); render(<App />); await user.type(screen.getByLabelText(/task title/i), 'Remove me'); await user.click(screen.getByRole('button', { name: /add task/i })); await user.click(screen.getByRole('button', { name: /delete remove me/i })); expect(screen.queryByRole('heading', { name: 'Remove me' })).not.toBeInTheDocument() })
  it('switches between light and dark themes', async () => { const user = userEvent.setup(); render(<App />); const toggle = screen.getByRole('button', { name: /switch to dark theme/i }); expect(document.documentElement.dataset.theme).toBe('light'); await user.click(toggle); expect(document.documentElement.dataset.theme).toBe('dark'); expect(toggle).toHaveAccessibleName('Switch to light theme'); expect(window.localStorage.getItem('taskflow-theme')).toBe('dark') })
  it('restores a previously selected theme', () => { window.localStorage.setItem('taskflow-theme', 'dark'); render(<App />); expect(document.documentElement.dataset.theme).toBe('dark'); expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument() })
  it('uses the system preference when no theme is saved', () => { vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))); render(<App />); expect(document.documentElement.dataset.theme).toBe('dark') })
  it('provides a keyboard-accessible theme toggle', async () => { const user = userEvent.setup(); render(<App />); const toggle = screen.getByRole('button', { name: /switch to dark theme/i }); toggle.focus(); expect(toggle).toHaveAttribute('aria-pressed', 'false'); await user.keyboard('{Enter}'); expect(document.documentElement.dataset.theme).toBe('dark'); expect(toggle).toHaveAttribute('aria-pressed', 'true') })
  it('continues to work when localStorage is unavailable', async () => { const user = userEvent.setup(); const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable') }); const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable') }); render(<App />); await user.click(screen.getByRole('button', { name: /switch to dark theme/i })); expect(document.documentElement.dataset.theme).toBe('dark'); expect(getItem).toHaveBeenCalled(); expect(setItem).toHaveBeenCalled() })
})
