import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface MobileBottomNavProps {
  onOpenEmergency: () => void
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenEmergency }) => {
  const { t, i18n } = useTranslation()
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ta' ? 'en' : 'ta'
    i18n.changeLanguage(nextLang)
    localStorage.setItem('serenly_lang', nextLang)
  }

  const primaryItems = [
    { path: '/', label: t('navDashboard'), icon: 'spa' },
    { path: '/mood', label: t('navMood'), icon: 'mood' },
    { path: '/coping', label: t('navCoping'), icon: 'air' },
    { path: '/journal', label: t('navJournal'), icon: 'stylus_note' },
  ]

  const moreItems = [
    { path: '/goals', label: t('navGoals'), icon: 'yard' },
    { path: '/medications', label: t('navMeds'), icon: 'medication' },
    { path: '/community', label: t('navCommunity'), icon: 'diversity_1' },
    { path: '/professionals', label: t('navSupport'), icon: 'psychology' },
    { path: '/resources', label: t('navResources'), icon: 'local_library' },
    { path: '/settings', label: t('settings'), icon: 'tune' },
  ]

  return (
    <>
      {/* More Menu Drawer */}
      {showMoreMenu && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-primary-forest/30 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="bg-surface-card rounded-t-3xl p-6 shadow-2xl border-t border-primary-forest/10 flex flex-col gap-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <span className="font-display font-bold text-text-primary text-base">
                {t('navMore')}
              </span>
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full text-xs font-semibold text-text-secondary"
              >
                <span className={i18n.language === 'en' ? 'text-primary-teal font-bold' : ''}>EN</span>
                <span>•</span>
                <span className={i18n.language === 'ta' ? 'text-primary-teal font-bold' : ''}>தமிழ்</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {moreItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMoreMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 p-3 rounded-2xl transition-all text-xs ${
                      isActive
                        ? 'bg-container-sage text-text-primary font-bold shadow-xs'
                        : 'bg-surface-container-low text-text-secondary hover:bg-surface-container-high'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-primary-teal text-lg">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Emergency trigger inside More menu */}
            <button
              type="button"
              onClick={() => {
                setShowMoreMenu(false)
                onOpenEmergency()
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emergency-surface border border-emergency/20 text-emergency font-semibold text-xs"
            >
              <span className="material-symbols-outlined text-base">health_and_safety</span>
              <span>{t('safetyAnchor')} — {t('getHelpNow')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Bottom Nav Bar */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-card/95 backdrop-blur-xl border-t border-primary-forest/8 z-30 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(22,60,58,0.05)]"
      >
        {primaryItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-primary-teal font-bold scale-105'
                  : 'text-text-muted hover:text-text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-[10px] leading-tight truncate max-w-[64px]">{item.label}</span>
          </NavLink>
        ))}

        {/* More Button */}
        <button
          type="button"
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            showMoreMenu ? 'text-primary-teal font-bold' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-xl">menu</span>
          <span className="text-[10px] leading-tight">{t('navMore')}</span>
        </button>
      </nav>
    </>
  )
}
