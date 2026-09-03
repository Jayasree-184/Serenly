import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'

interface SidebarProps {
  onOpenEmergency: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenEmergency }) => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ta' ? 'en' : 'ta'
    i18n.changeLanguage(nextLang)
    localStorage.setItem('serenly_lang', nextLang)
  }

  const navItems = [
    { path: '/', label: t('navDashboard'), icon: 'spa' },
    { path: '/mood', label: t('navMood'), icon: 'mood' },
    { path: '/coping', label: t('navCoping'), icon: 'air' },
    { path: '/journal', label: t('navJournal'), icon: 'stylus_note' },
    { path: '/goals', label: t('navGoals'), icon: 'yard' },
    { path: '/medications', label: t('navMeds'), icon: 'medication' },
    { path: '/community', label: t('navCommunity'), icon: 'diversity_1' },
    { path: '/professionals', label: t('navSupport'), icon: 'psychology' },
    { path: '/resources', label: t('navResources'), icon: 'local_library' },
  ]

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-surface-container-low/95 backdrop-blur-xl z-50 flex-col justify-between border-r border-primary-forest/5 shadow-[0_1px_8px_rgba(22,60,58,0.04)]">
      {/* Top logo & navigation */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-5 pt-6">
        <div className="pb-6">
          <Logo size="md" showTagline={true} />
        </div>

        <nav className="flex flex-col gap-1 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-body text-sm ${
                  isActive
                    ? 'bg-container-sage text-text-primary font-semibold shadow-xs'
                    : 'text-text-secondary hover:bg-surface-container-high hover:text-text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-primary-teal text-xl shrink-0">
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Area: Safety Anchor + Settings + Language */}
      <div className="p-5 flex flex-col gap-3 bg-surface-container-low/80 border-t border-primary-forest/5">
        {/* Safety Anchor Card */}
        <div className="bg-emergency-surface border border-emergency-border/30 rounded-2xl p-4 flex flex-col gap-2 shadow-[0_1px_4px_rgba(185,74,72,0.08)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emergency font-display">
              {t('safetyAnchor')}
            </span>
            <span className="material-symbols-outlined text-emergency text-base">health_and_safety</span>
          </div>
          <button
            type="button"
            onClick={onOpenEmergency}
            className="w-full flex items-center justify-center gap-2 bg-emergency hover:bg-emergency/90 text-white font-medium text-xs py-2 px-3 rounded-xl transition-transform active:scale-95 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">call</span>
            <span>{t('getHelpNow')}</span>
          </button>
          <p className="text-[11px] text-text-secondary text-center leading-tight">
            {t('safetyAnchorNotice')}
          </p>
        </div>

        {/* Footer controls: Settings + Language */}
        <div className="flex items-center justify-between pt-1 text-text-secondary text-xs">
          <NavLink
            to="/settings"
            className="hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>{t('settings')}</span>
          </NavLink>

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-dim px-2.5 py-1 rounded-full text-xs text-text-secondary transition-colors cursor-pointer"
          >
            <span className={i18n.language === 'en' ? 'text-primary-teal font-bold' : ''}>EN</span>
            <span className="text-text-muted">•</span>
            <span className={i18n.language === 'ta' ? 'text-primary-teal font-bold' : ''}>தமிழ்</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
