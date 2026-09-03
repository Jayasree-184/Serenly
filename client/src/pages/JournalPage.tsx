import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface JournalEntryItem {
  id: string
  title: string
  body: string
  date: string
  tag: string
  wordCount: number
}

export const JournalPage: React.FC = () => {
  const { t } = useTranslation()

  // Journal Entry State
  const [title, setTitle] = useState('Letting today just be what it is')
  const [body, setBody] = useState(
    'Woke up with that heavy fog in my chest again. Decided not to fight it or get frustrated with myself. Made chamomile tea, stood by the window for 5 minutes, and watered the fern. Small things still matter even when the day feels muted. I am allowing myself to exist without producing anything extraordinary today.'
  )
  const [tags, setTags] = useState(['#MorningReflections', '#Acceptance', '#SelfCompassion'])
  const [saveStatus, setSaveStatus] = useState('Autosaved just now')
  const [filterMood, setFilterMood] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Entries archive
  const [entries, setEntries] = useState<JournalEntryItem[]>([
    {
      id: '1',
      title: 'Letting today just be what it is',
      body: 'Woke up with that heavy fog in my chest again. Decided not to fight it...',
      date: 'Today',
      tag: '#Acceptance',
      wordCount: 142,
    },
    {
      id: '2',
      title: 'Walking until the noise settled',
      body: 'Took the trail by the river. Noticed the changing leaves and remembered that shedding can be natural...',
      date: 'Oct 23',
      tag: '#Calm',
      wordCount: 210,
    },
    {
      id: '3',
      title: 'A boundary I actually held',
      body: 'Said no to the extra weekend project. Felt that guilty wave for twenty minutes, then pure relief...',
      date: 'Oct 21',
      tag: '#Growth',
      wordCount: 180,
    },
    {
      id: '4',
      title: 'Night-time unburdening',
      body: 'Everything feels magnified at 11pm. Listing 3 things that are already resolved helps ground me...',
      date: 'Oct 18',
      tag: '#SleepSanctuary',
      wordCount: 95,
    },
  ])

  // Word count calculation
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
    setSaveStatus('Editing gently...')
  }

  // Insert prompt helper
  const insertPrompt = (promptText: string) => {
    const separator = body.length > 0 && !body.endsWith('\n\n') ? '\n\n' : ''
    setBody((prev) => `${prev}${separator}${promptText}\n`)
    setSaveStatus('Prompt added')
  }

  const handleSaveEntry = () => {
    const newEntry: JournalEntryItem = {
      id: Date.now().toString(),
      title: title.trim() || 'Gentle Reflection',
      body: body.trim(),
      date: 'Just now',
      tag: tags[0] || '#Reflection',
      wordCount,
    }

    setEntries((prev) => [newEntry, ...prev])
    setSaveStatus('Saved securely just now')
    setTimeout(() => setSaveStatus('Autosaved just now'), 3000)
  }

  const handleClearEntry = () => {
    if (window.confirm('Clear this reflection canvas? (Your thoughts will be reset)')) {
      setTitle('')
      setBody('')
      setSaveStatus('Canvas cleared')
    }
  }

  const handleDownloadText = () => {
    const content = `Serenly Private Sanctuary Entry\nDate: ${new Date().toLocaleDateString()}\nTitle: ${
      title || 'Reflection'
    }\n\n${body}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `serenly-journal-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove))
  }

  const prompts = [
    { num: '01.', text: 'What feels heavy today?' },
    { num: '02.', text: 'What is one small thing I managed today?' },
    { num: '03.', text: 'What do I need right now in this moment?' },
    { num: '04.', text: 'What would I say to a friend who felt this way?' },
  ]

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.body.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Top Sanctuary Header & Encryption Anchor */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-text-muted text-xs font-body">
            <span>Sanctuary</span>
            <span>/</span>
            <span className="text-primary-teal font-medium">Personal Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight">
            {t('privateJournalTitle')}
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-xl">
            {t('privateJournalSub')}
          </p>
        </div>

        {/* Security Pill Banner */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/60 shadow-xs self-start md:self-auto">
          <span className="material-symbols-outlined text-secondary text-base">lock</span>
          <span className="text-xs font-semibold text-text-primary font-display">
            {t('endToEndEncrypted')}
          </span>
        </div>
      </section>

      {/* Main Sanctuary Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Journal Editor & Prompts */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Present Moment & Ambience Strip */}
          <div className="bg-surface-card rounded-3xl p-5 shadow-xs border border-primary-forest/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider font-display">
                {t('presentMoment')}
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-display font-bold text-sm sm:text-base text-text-primary">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-text-muted">•</span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent-sky text-on-accent-sky text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">cloud</span>
                  <span>Feeling: Low & Quiet</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-surface-container-low px-3.5 py-1.5 rounded-2xl self-start sm:self-auto text-xs text-text-secondary font-medium">
              <span className="material-symbols-outlined text-base text-primary-teal">water_drop</span>
              <span>Soft Rain: Calm</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
            </div>
          </div>

          {/* Gentle Prompts Carousel */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 text-xs text-text-muted font-display uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-sm text-primary-teal">auto_awesome</span>
                <span>{t('gentlePromptsToday')}</span>
              </div>
              <span className="text-xs text-text-secondary">{t('tapToInsert')}</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
              {prompts.map((p) => (
                <button
                  key={p.num}
                  type="button"
                  onClick={() => insertPrompt(p.text)}
                  className="shrink-0 text-left px-4 py-2.5 rounded-2xl bg-surface-card hover:bg-container-sage text-text-secondary hover:text-text-primary text-xs sm:text-sm shadow-xs border border-primary-forest/5 transition-all cursor-pointer"
                >
                  <span className="text-text-muted font-bold mr-1.5">{p.num}</span>
                  <span>“{p.text}”</span>
                </button>
              ))}
            </div>
          </div>

          {/* Distraction-Free Journal Canvas Card */}
          <div className="bg-surface-card rounded-3xl p-6 sm:p-8 shadow-sm border border-primary-forest/5 flex flex-col gap-5">
            {/* Visual Flourish Header */}
            <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-r from-primary-forest via-primary-teal to-sage/40 flex items-end p-4 text-white">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">nature_people</span>
                  <span className="text-xs font-medium">Atmosphere: Quiet Window View</span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-85">
                  Safe Space
                </span>
              </div>
            </div>

            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('giveFeelingName')}
                className="w-full bg-transparent font-display font-bold text-lg sm:text-xl md:text-2xl text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <div className="h-0.5 w-12 bg-container-sage rounded-full"></div>
            </div>

            {/* Textarea Canvas */}
            <textarea
              rows={9}
              value={body}
              onChange={handleBodyChange}
              placeholder={t('writeHereOnlyForYou')}
              className="w-full bg-surface-oat/70 rounded-2xl p-4 sm:p-5 text-text-primary placeholder:text-text-muted focus:outline-none focus:bg-surface-card leading-relaxed text-sm sm:text-base resize-y transition-colors border border-transparent focus:border-primary-teal/20"
            />

            {/* Emotional Tags Wrap */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-text-muted mr-1">Themes:</span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-container-sage text-primary-forest text-xs font-medium flex items-center gap-1 shadow-xs"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-emergency transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              ))}
            </div>

            {/* Bottom Bar: Status & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-surface-container-high">
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  <span>{saveStatus}</span>
                </div>
                <span>•</span>
                <span className="text-text-muted">{t('gentleWords', { count: wordCount })}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleDownloadText}
                  className="px-4 py-2 rounded-2xl bg-surface-oat hover:bg-surface-container-high text-text-secondary text-xs font-semibold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>{t('downloadText')}</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearEntry}
                  className="px-4 py-2 rounded-2xl bg-surface-oat hover:bg-emergency-surface hover:text-emergency text-text-secondary text-xs font-semibold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">delete_outline</span>
                  <span>{t('clear')}</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveEntry}
                  className="px-5 py-2 rounded-2xl bg-primary-teal hover:bg-primary-forest text-white text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">check</span>
                  <span>{t('saveEntry')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grounding Reflection Comfort Card */}
          <div className="bg-surface-card rounded-3xl p-5 shadow-xs border border-primary-forest/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-secondary-container flex items-center justify-center text-primary-teal shrink-0">
                <span className="material-symbols-outlined text-xl">spa</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-xs sm:text-sm text-text-primary">
                  {t('stuckOnWriting')}
                </span>
                <span className="text-xs text-text-secondary">
                  {t('stuckOnWritingSub')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Archive, Search, and Trust */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Search & Mood Filter Card */}
          <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchReflections')}
                className="w-full bg-surface-oat rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:bg-surface-card transition-colors border border-transparent focus:border-primary-teal/20"
              />
            </div>

            {/* Filter pills */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider font-display">
                {t('filterByMood')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Heavy days', 'Calm days', 'Breakthroughs'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilterMood(f)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                      filterMood === f
                        ? 'bg-primary-teal text-white font-semibold'
                        : 'bg-surface-container-low text-text-secondary hover:bg-surface-container-high'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mini Calendar View */}
          <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-sm text-text-primary">
                October 2024
              </span>
              <div className="flex items-center gap-1 text-text-secondary">
                <span className="material-symbols-outlined text-sm cursor-pointer p-1">chevron_left</span>
                <span className="material-symbols-outlined text-sm cursor-pointer p-1">chevron_right</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
              <span className="text-text-muted">M</span>
              <span className="text-text-muted">T</span>
              <span className="text-text-muted">W</span>
              <span className="text-text-muted">T</span>
              <span className="text-text-muted">F</span>
              <span className="text-text-muted">S</span>
              <span className="text-text-muted">S</span>

              <span className="text-text-muted/40 py-1">30</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                1<span className="w-1 h-1 rounded-full bg-secondary"></span>
              </span>
              <span className="text-text-primary py-1">2</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                3<span className="w-1 h-1 rounded-full bg-accent-lavender"></span>
              </span>
              <span className="text-text-primary py-1">4</span>
              <span className="text-text-primary py-1">5</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                6<span className="w-1 h-1 rounded-full bg-accent-sky"></span>
              </span>
              <span className="text-text-primary py-1">7</span>
              <span className="text-text-primary py-1">8</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                9<span className="w-1 h-1 rounded-full bg-container-sage"></span>
              </span>
              <span className="text-text-primary py-1">10</span>
              <span className="text-text-primary py-1">11</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                12<span className="w-1 h-1 rounded-full bg-accent-peach"></span>
              </span>
              <span className="text-text-primary py-1">13</span>
              <span className="text-text-primary py-1">14</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                15<span className="w-1 h-1 rounded-full bg-container-sage"></span>
              </span>
              <span className="text-text-primary py-1">16</span>
              <span className="text-text-primary py-1">17</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                18<span className="w-1 h-1 rounded-full bg-accent-sky"></span>
              </span>
              <span className="text-text-primary py-1">19</span>
              <span className="text-text-primary py-1">20</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                21<span className="w-1 h-1 rounded-full bg-accent-lavender"></span>
              </span>
              <span className="text-text-primary py-1">22</span>
              <span className="text-text-primary py-1 relative flex flex-col items-center">
                23<span className="w-1 h-1 rounded-full bg-secondary"></span>
              </span>
              <div className="py-1 flex flex-col items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-primary-teal text-white flex items-center justify-center font-bold text-xs">
                  24
                </span>
              </div>
              <span className="text-text-primary py-1">25</span>
              <span className="text-text-primary py-1">26</span>
              <span className="text-text-primary py-1">27</span>
            </div>
          </div>

          {/* Recent Entries Archive */}
          <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-sm text-text-primary">
                {t('recentEntries')}
              </span>
              <span className="text-xs text-primary-teal font-semibold">
                {filteredEntries.length} entries
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => {
                    setTitle(entry.title)
                    setBody(entry.body)
                  }}
                  className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-container-sage/40 transition-colors cursor-pointer flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-primary truncate max-w-[180px]">
                      {entry.title}
                    </span>
                    <span className="text-text-muted">{entry.date}</span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {entry.body}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-surface-card text-[11px] text-text-primary">
                      {entry.tag}
                    </span>
                    <span className="text-[11px] text-text-muted">{entry.wordCount} words</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zero-Knowledge Privacy Shield Notice */}
          <div className="rounded-3xl bg-secondary-container/40 p-5 shadow-xs flex flex-col gap-2 border border-primary-teal/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary-teal shrink-0">
                <span className="material-symbols-outlined text-base">verified_user</span>
              </div>
              <span className="font-semibold text-xs sm:text-sm text-text-primary font-display">
                {t('zeroKnowledgeTitle')}
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {t('zeroKnowledgeNotice')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
