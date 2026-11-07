import type { CSSProperties } from 'react'

type IconName =
  | 'arrow'
  | 'external'
  | 'plus'
  | 'minus'
  | 'close'
  | 'menu'
  | 'chevron'
  | 'search'
  | 'pin'
  | 'spark'
  | 'play'
  | 'pause'
  | 'reset'
  | 'check'
const paths: Record<IconName, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  external: 'M7 17 18 6M7 6h11v11',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 7h16M4 17h16',
  chevron: 'm8 10 4 4 4-4',
  search: 'm16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  spark: 'm12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z',
  play: 'm9 5 11 7-11 7Z',
  pause: 'M8 5v14M16 5v14',
  reset: 'M4 10a8 8 0 1 1 1 8M4 4v6h6',
  check: 'm5 12 4 4L19 6',
}
export function Icon({
  name = 'arrow',
  size = 20,
  style,
}: {
  name?: IconName
  size?: number
  style?: CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={paths[name]} />
    </svg>
  )
}
