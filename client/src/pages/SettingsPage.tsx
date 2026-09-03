import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation()

  // Accessibility State
  const [fontScale, setFontScale] = useState<number>(() => {
    return Number(localStorage.getItem('serenly_font_scale') || 100)
  })

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('serenly_high_contrast') === 'true'
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--app-font-scale', `${fontScale}%`)
    localStorage.setItem('serenly_font_scale', fontScale.toString())
  }, [fontScale])

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
    localStorage.setItem('serenly_high_contrast', highContrast.toString())
  }, [highContrast])

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('serenly_lang', lang)
  }

  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      language: i18n.language,
      moodHistory: JSON.parse(localStorage.getItem('moodHistory') || '[]'),
      journalEntries: JSON.parse(localStorage.getItem('journalEntries') || '[]'),
      goals: JSON.parse(localStorage.getItem('goals') || '[]'),
      meds: JSON.parse(localStorage.getItem('meds') || '[]'),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `serenly-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePurgeData = () => {
    if (
      window.confirm(
        'Are you sure you want to permanently erase all locally stored data on this device? This action cannot be undone.'
      )
    ) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-3xl animate-fade-in">
      {/* Header */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-teal"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
            Preferences & Sanctuary
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary">
          {t('settings')}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          Personalize your accessibility, language, and privacy controls.
        </p>
      </section>

      {/* Language Settings */}
      <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
        <h2 className="font-display font-bold text-base text-text-primary">
          {t('language')} (மொழி)
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={`flex-1 p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              i18n.language === 'en'
                ? 'bg-container-sage border-primary-teal text-primary-forest shadow-xs'
                : 'bg-surface-oat border-transparent text-text-secondary hover:bg-surface-dim'
            }`}
          >
            English (Global)
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('ta')}
            className={`flex-1 p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              i18n.language === 'ta'
                ? 'bg-container-sage border-primary-teal text-primary-forest shadow-xs'
                : 'bg-surface-oat border-transparent text-text-secondary hover:bg-surface-dim'
            }`}
          >
            தமிழ் (Tamil)
          </button>
        </div>
      </div>

      {/* Accessibility & Visual Controls */}
      <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-5">
        <h2 className="font-display font-bold text-base text-text-primary">
          Accessibility & Reading Comfort
        </h2>

        {/* Font Scaling */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-xs sm:text-sm text-text-primary block">
              Typography Size Scaling
            </span>
            <span className="text-xs text-text-muted">
              Current text scale: {fontScale}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFontScale((s) => Math.max(85, s - 5))}
              className="px-3.5 py-1.5 rounded-xl bg-surface-oat hover:bg-surface-dim font-bold text-xs cursor-pointer"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontScale(100)}
              className="px-3.5 py-1.5 rounded-xl bg-surface-oat hover:bg-surface-dim font-semibold text-xs cursor-pointer"
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setFontScale((s) => Math.min(130, s + 5))}
              className="px-3.5 py-1.5 rounded-xl bg-surface-oat hover:bg-surface-dim font-bold text-xs cursor-pointer"
            >
              A+
            </button>
          </div>
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
          <div>
            <span className="font-semibold text-xs sm:text-sm text-text-primary block">
              High Contrast Vision Mode
            </span>
            <span className="text-xs text-text-muted">
              Increases contrast for outdoor or low-vision readability
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              highContrast ? 'bg-primary-teal' : 'bg-surface-dim'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                highContrast ? 'left-6.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Privacy & Data Ownership */}
      <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
        <h2 className="font-display font-bold text-base text-text-primary">
          Privacy by Design & Data Portability
        </h2>
        <p className="text-xs text-text-secondary leading-relaxed">
          You own your mental wellness journey. Serenly does not run ad trackers, third-party analytics pixels, or commercial profiling.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-container-sage hover:bg-container-sage/80 text-primary-forest text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Export Personal Sanctuary Archive (JSON)</span>
          </button>

          <button
            type="button"
            onClick={handlePurgeData}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-surface-oat hover:bg-emergency-surface hover:text-emergency text-text-secondary text-xs font-semibold transition-colors cursor-pointer"
          >
            Purge Local Storage
          </button>
        </div>
      </div>
    </div>
  )
}
