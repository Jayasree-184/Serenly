import React from 'react'
import { useTranslation } from 'react-i18next'

interface EmergencyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-forest/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-surface-card rounded-3xl p-6 md:p-8 shadow-2xl border border-emergency-border flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emergency-surface flex items-center justify-center text-emergency shrink-0">
              <span className="material-symbols-outlined text-2xl">health_and_safety</span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emergency">
                {t('safetyAnchor')}
              </span>
              <h2 id="emergency-title" className="text-xl md:text-2xl font-display font-bold text-text-primary">
                {t('emergencyTitle')}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-surface-oat text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <p className="text-body-base text-text-secondary leading-relaxed">
          {t('emergencyMsg')}
        </p>

        {/* Crisis Action Options */}
        <div className="flex flex-col gap-3">
          {/* US / Global 988 */}
          <a
            href="tel:988"
            className="flex items-center justify-between p-4 rounded-2xl bg-emergency text-white font-medium hover:bg-emergency/90 transition-transform active:scale-[0.98] shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">call</span>
              <div>
                <div className="font-semibold text-sm md:text-base">988 Suicide & Crisis Lifeline</div>
                <div className="text-xs text-white/80">Available 24/7 in English & Spanish (Call or Text)</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>

          {/* India Kiran Helpline */}
          <a
            href="tel:18005990019"
            className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-oat text-text-primary transition-colors border border-border-hairline"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-teal">support_agent</span>
              <div>
                <div className="font-semibold text-sm md:text-base">1800-599-0019 (KIRAN Helpline, India)</div>
                <div className="text-xs text-text-secondary">24/7 National Mental Health Helpline (13 languages)</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-text-muted">arrow_forward</span>
          </a>

          {/* Chennai / Tamil Nadu Sneha Helpline */}
          <a
            href="tel:04424640050"
            className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-oat text-text-primary transition-colors border border-border-hairline"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">forum</span>
              <div>
                <div className="font-semibold text-sm md:text-base">044-24640050 (Sneha India, Chennai)</div>
                <div className="text-xs text-text-secondary">Confidential emotional support in Tamil & English</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-text-muted">arrow_forward</span>
          </a>

          {/* Local emergency */}
          <div className="p-4 rounded-2xl bg-surface-oat/80 flex items-start gap-3 text-text-secondary text-sm">
            <span className="material-symbols-outlined text-base text-text-muted mt-0.5">info</span>
            <div>
              <div className="font-semibold text-text-primary">Need in-person immediate assistance?</div>
              <div>Please contact your local emergency services (such as 911, 112, or 108) or go to the nearest hospital emergency room.</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-text-muted text-center pt-2 border-t border-surface-container-high">
          Serenly is a supportive self-care application and cannot directly dispatch emergency responders.
        </div>
      </div>
    </div>
  )
}
