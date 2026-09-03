import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Professional {
  id: string
  name: string
  title: string
  specialties: string[]
  languages: string[]
  availability: string
  isVerified: boolean
  bio: string
}

export const ProfessionalsPage: React.FC = () => {
  const { t } = useTranslation()

  const [filterLang, setFilterLang] = useState('All')

  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Dr. Radhika Sundaram, Ph.D.',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Depression', 'Anxiety & Panic', 'Mindfulness CBT'],
      languages: ['English', 'Tamil'],
      availability: 'Mon - Thu • Video Sessions',
      isVerified: true,
      bio: 'Over 12 years of clinical experience specializing in compassionate cognitive-behavioral therapies and cultural sensitivity in mental wellness.',
    },
    {
      id: '2',
      name: 'Karthik Narayanan, LMFT',
      title: 'Licensed Marriage & Family Counselor',
      specialties: ['Burnout', 'Work Stress', 'Emotional Regulation'],
      languages: ['English', 'Tamil'],
      availability: 'Tue - Sat • In-person & Online',
      isVerified: true,
      bio: 'Dedicated to helping individuals navigate life transitions, workplace stress, and family emotional systems through evidence-based methods.',
    },
    {
      id: '3',
      name: 'Dr. Sarah Jenkins, Psy.D.',
      title: 'Consultant Clinical Neuropsychologist',
      specialties: ['Trauma-Informed Care', 'Sleep Disturbances', 'Compassion Therapy'],
      languages: ['English'],
      availability: 'Wed - Fri • Online Consultations',
      isVerified: true,
      bio: 'Focuses on the neuroscience of emotional safety, gentle habit remodeling, and nervous system down-regulation.',
    },
  ]

  const filtered = professionals.filter((p) => {
    if (filterLang === 'All') return true
    return p.languages.includes(filterLang)
  })

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-4xl animate-fade-in">
      {/* Header */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-teal"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
            {t('sanctuarySpace')}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary">
          {t('profSupportTitle')}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          {t('profSupportSub')}
        </p>
      </section>

      {/* Distinction Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-oat border border-primary-forest/10 flex items-start gap-3.5">
        <span className="material-symbols-outlined text-primary-teal text-xl mt-0.5 shrink-0">
          verified
        </span>
        <div className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          <strong className="text-text-primary font-semibold block mb-0.5">
            Clear Care Hierarchy
          </strong>
          {t('profDisclaimer')} Serenly connects you with independently verified practitioners. Serenly does not provide medical diagnosis or crisis treatment directly.
        </div>
      </div>

      {/* Language filter pills */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted font-semibold">Filter by language:</span>
        {['All', 'Tamil', 'English'].map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setFilterLang(lang)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filterLang === lang
                ? 'bg-primary-teal text-white'
                : 'bg-surface-card text-text-secondary hover:bg-surface-oat border border-primary-forest/5'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Practitioners Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((prof) => (
          <div
            key={prof.id}
            className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-base text-text-primary">
                      {prof.name}
                    </h3>
                    {prof.isVerified && (
                      <span
                        title="Verified Healthcare Practitioner"
                        className="material-symbols-outlined text-success text-base"
                      >
                        verified
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-primary-teal font-medium">
                    {prof.title}
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                {prof.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {prof.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-full bg-surface-oat text-[11px] text-text-secondary font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-surface-container-high">
                <span>Languages: {prof.languages.join(', ')}</span>
                <span>{prof.availability}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                alert('Connection request sent. The verified practitioner office will contact you.')
              }
              className="w-full py-2.5 rounded-xl bg-container-sage hover:bg-container-sage/80 text-primary-forest font-semibold text-xs transition-colors cursor-pointer"
            >
              Request Gentle Consultation
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
