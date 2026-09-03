import React from 'react'

interface LogoProps {
  className?: string
  showTagline?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M20 2C10 2 2 10 2 20C2 30 10 38 20 38C22 38 32 38 36 32C39 27 38 18 34 12C30 6 25 2 20 2Z"
            fill="#205B55"
            opacity="0.95"
          />
          <path
            d="M20 7C27 7 32 12 32 19C32 25 27 31 20 31C16 31 11 28 9 24C12 25 17 25 20 22C23 19 23 14 21 10C20.6 9 20.3 8 20 7Z"
            fill="#A8C8B8"
          />
          <circle cx="20" cy="20" r="4.5" fill="#F7F5EF" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold tracking-tight text-primary-forest text-lg leading-tight">
          SERENLY
        </span>
        {showTagline && (
          <span className="text-[11px] font-body text-text-muted leading-tight">
            Healing starts here.
          </span>
        )}
      </div>
    </div>
  )
}
