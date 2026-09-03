import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Resource {
  id: string
  title: string
  titleTa: string
  category: string
  readingTime: string
  summary: string
  summaryTa: string
  content: string
}

export const ResourcesPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeResource, setActiveResource] = useState<Resource | null>(null)

  const categories = [
    'All',
    'Depression',
    'Stress & Burnout',
    'Sleep Sanctuary',
    'Nutrition & Body',
    'When to Seek Help',
  ]

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Depression: Why the Fog Happens',
      titleTa: 'மனச்சோர்வைப் புரிந்துகொள்ளுதல்: ஏன் மூடுபனி போன்ற உணர்வு ஏற்படுகிறது?',
      category: 'Depression',
      readingTime: '4 min read',
      summary:
        'Depression is not laziness or a personal failing. Learn the neurobiology of low-energy days and why your nervous system requests rest.',
      summaryTa:
        'மனச்சோர்வு என்பது சோம்பேறித்தனம் அல்ல. நரம்பு மண்டலம் ஏன் ஓய்வு கோருகிறது என்பதைப் புரிந்து கொள்ளுங்கள்.',
      content: `Depression is a profound neurochemical and biological response to chronic stress, loss, or physiological burnout. When you experience that 'heavy fog' in your chest, your body's sympathetic and parasympathetic systems are attempting to protect you by downregulating energy.

Practical takeaways:
1. Stop resisting low energy: Acceptance lowers cortisol.
2. Celebrate micro-movements: Taking a sip of water or opening the curtains is real progress.
3. Keep boundaries gentle: Say no to unnecessary social output during heavy days.`,
    },
    {
      id: '2',
      title: 'When and How to Seek Professional Help',
      titleTa: 'எப்போது மற்றும் எப்படி நிபுணர் உதவியை நாட வேண்டும்?',
      category: 'When to Seek Help',
      readingTime: '3 min read',
      summary:
        'Clear, compassionate guidance on recognizing when self-care needs the partnership of a trained counselor or physician.',
      summaryTa:
        'சுய பராமரிப்புடன் மருத்துவ நிபுணரின் ஆதரவு எப்போது தேவைப்படும் என்பதை அறிவதற்கான தெளிவான வழிகாட்டல்.',
      content: `While self-care tools like journaling and breathwork provide vital relief, therapy and medical intervention provide structured healing when:
- Low mood persists uninterrupted for more than two consecutive weeks.
- Basic functioning (eating, sleeping, leaving bed) becomes consistently difficult.
- Thoughts of hopelessness or wanting to disappear arise.

Remember: Reaching out to a counselor is not a sign that you failed to heal yourself—it is the ultimate act of self-compassion.`,
    },
    {
      id: '3',
      title: 'Sleep Architecture & Calming the Late-Night Mind',
      titleTa: 'தூக்க அமைப்பும் இரவு நேர எண்ணங்களை அமைதிப்படுத்துதலும்',
      category: 'Sleep Sanctuary',
      readingTime: '5 min read',
      summary:
        'Why thoughts feel catastrophic at 11 PM, and how gentle evening rituals restore REM and deep sleep.',
      summaryTa:
        'இரவு 11 மணிக்கு ஏன் பிரச்சனைகள் பெரிதாகத் தோன்றுகின்றன? தூக்கத்தை மீட்டெடுக்கும் எளிய முறைகள்.',
      content: `At night, our prefrontal cortex slows down, while the amygdala remains active. This neurological shift magnifies anxiety and makes small unresolved problems feel catastrophic.

Soothing Evening Habits:
- Keep room temperature slightly cool.
- Switch from bright overhead lighting to warm ambient lamps 1 hour before sleep.
- Use the Serenly Private Journal for a 'brain-dump' to externalize rumination.`,
    },
    {
      id: '4',
      title: 'Nourishing the Brain: Food, Water & Mood Stability',
      titleTa: 'மூளைக்கு ஊட்டச்சத்து: உணவு, தண்ணீர் & மனநிலை ஸ்திரத்தன்மை',
      category: 'Nutrition & Body',
      readingTime: '4 min read',
      summary:
        'The gut-brain axis: How small hydration habits and steady blood sugar protect your emotional baseline.',
      summaryTa:
        'குடல்-மூளை இணைப்பு: எளிய நீர்ச்சத்து பழக்கங்களும் சீரான இரத்த சர்க்கரையும் மனநிலையை எவ்வாறு பாதுகாக்கின்றன.',
      content: `Over 90% of your body's serotonin receptors are located in your gut. Extreme blood sugar spikes and dehydration directly trigger panic-like symptoms (racing heart, brain fog, fatigue).

Gentle steps for low-energy days:
- Drink room-temperature water first thing in the morning.
- Eat small, protein-rich snacks rather than forcing huge meals.
- Be gentle with your appetite changes during difficult periods.`,
    },
  ]

  const filtered = resources.filter((r) => {
    if (selectedCategory === 'All') return true
    return r.category === selectedCategory
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
          {t('resourcesTitle')}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          {t('resourcesSub')}
        </p>
      </section>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-primary-teal text-white shadow-xs'
                : 'bg-surface-card text-text-secondary hover:bg-surface-oat border border-primary-forest/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="px-2.5 py-0.5 rounded-md bg-container-sage/60 text-primary-forest font-semibold">
                  {item.category}
                </span>
                <span>{item.readingTime}</span>
              </div>
              <h2 className="font-display font-bold text-base sm:text-lg text-text-primary leading-snug">
                {i18n.language === 'ta' ? item.titleTa : item.title}
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {i18n.language === 'ta' ? item.summaryTa : item.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveResource(item)}
              className="text-xs font-semibold text-primary-teal hover:text-primary-forest transition-colors self-start flex items-center gap-1 cursor-pointer"
            >
              <span>Read gentle guide</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </article>
        ))}
      </div>

      {/* Modal Reader */}
      {activeResource && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-primary-forest/40 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveResource(null)}
        >
          <div
            className="bg-surface-card rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-primary-forest/10 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-primary-teal uppercase tracking-wider">
                  {activeResource.category} • {activeResource.readingTime}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary mt-1">
                  {i18n.language === 'ta' ? activeResource.titleTa : activeResource.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveResource(null)}
                className="p-1 text-text-muted hover:text-text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="text-xs sm:text-sm text-text-primary leading-relaxed whitespace-pre-line border-t border-surface-container-high pt-4">
              {activeResource.content}
            </div>

            <div className="pt-2 text-xs text-text-muted border-t border-surface-container-high">
              Educational reference curated for emotional support. Not medical advice.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
