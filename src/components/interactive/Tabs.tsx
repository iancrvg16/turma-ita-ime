import type { KeyboardEvent, ReactNode } from 'react'

export function Tabs<T extends string>({
  id,
  label,
  options,
  value,
  onChange,
  className = '',
}: {
  id: string
  label: string
  options: { value: T; label: ReactNode }[]
  value: T
  onChange: (v: T) => void
  className?: string
}) {
  function handleKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % options.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      next = (index - 1 + options.length) % options.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = options.length - 1
    else return
    e.preventDefault()
    onChange(options[next].value)
    document.getElementById(`${id}-tab-${options[next].value}`)?.focus()
  }
  return (
    <div className={`tabs ${className}`} role="tablist" aria-label={label}>
      {options.map((option, i) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          id={`${id}-tab-${option.value}`}
          aria-selected={value === option.value}
          aria-controls={`${id}-panel`}
          tabIndex={value === option.value ? 0 : -1}
          onClick={() => onChange(option.value)}
          onKeyDown={(e) => handleKey(e, i)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
