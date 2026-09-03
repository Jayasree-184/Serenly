import React from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'

interface HeaderProps {
  onOpenEmergency: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergency }) => {
  const { t, i18n } = useTranslation()

  // Format today's date
  const today = new Date().toLocaleDateString(i18n.language === 'ta' ? 'ta-IN' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="sticky top-0 lg:left-72 right-0 h-16 bg-surface-card/80 backdrop-blur-xl z-40 flex items-center justify-between px-4 sm:px-8 border-b border-primary-forest/5 shadow-[0_1px_8px_rgba(22,60,58,0.03)]">
      {/* Mobile brand / Desktop date statement */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <Logo size="sm" showTagline={false} />
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted">
          <span className="font-medium text-text-secondary">{today}</span>
          <span>•</span>
          <span className="italic text-text-secondary">“{t('supportiveStatement')}”</span>
        </div>
      </div>

      {/* Right: Quick actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Mobile Safety button */}
        <button
          onClick={onOpenEmergency}
          type="button"
          className="lg:hidden flex items-center gap-1.5 bg-emergency-surface border border-emergency/20 text-emergency px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">health_and_safety</span>
          <span>{t('getHelpNow')}</span>
        </button>

        {/* User status */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-semibold text-xs text-text-primary">Maya Lin</span>
            <span className="text-[11px] text-primary-teal flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              Taking it easy
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-container-sage text-primary-forest flex items-center justify-center font-bold text-xs ring-1 ring-primary-forest/10 shadow-xs">
            ML
          </div>
        </div>
      </div>
    </header>
  )
}
