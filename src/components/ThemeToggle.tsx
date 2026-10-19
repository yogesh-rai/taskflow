import { Theme } from '../hooks/useTheme'

type ThemeToggleProps = { theme: Theme; onToggle: () => void }

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return <button className="theme-toggle" type="button" aria-label={`Switch to ${nextTheme} theme`} aria-pressed={theme === 'dark'} onClick={onToggle}><span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span><span className="theme-toggle-text">{theme === 'light' ? 'Dark' : 'Light'}</span></button>
}
