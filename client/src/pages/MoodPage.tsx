import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/apiClient'

export const MoodPage: React.FC = () => {
  const { t } = useTranslation()

  // Form State
  const [selectedMood, setSelectedMood] = useState<number>(3) // 1 to 5 (3 = Okay)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(['Tired', 'Relieved', 'Peaceful'])
  const [energyLevel, setEnergyLevel] = useState<number>(45)
  const [sleepPhase, setSleepPhase] = useState<string>('Deep Rest')
  const [selectedContext, setSelectedContext] = useState<string[]>(['Sleep', 'Solitude'])
  const [privateNote, setPrivateNote] = useState<string>('')
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const moodOptions = [
    {
      id: 1,
      title: t('moodVeryLow'),
      desc: t('moodVeryLowSub'),
      icon: 'cloud',
      bgClass: 'bg-accent-lavender/50 text-on-accent-lavender',
    },
    {
      id: 2,
      title: t('moodLow'),
      desc: t('moodLowSub'),
      icon: 'waves',
      bgClass: 'bg-accent-sky/60 text-on-accent-sky',
    },
    {
      id: 3,
      title: t('moodOkay'),
      desc: t('moodOkaySub'),
      icon: 'yard',
      bgClass: 'bg-container-sage text-primary-forest',
    },
    {
      id: 4,
      title: t('moodGood'),
      desc: t('moodGoodSub'),
      icon: 'spa',
      bgClass: 'bg-secondary-container/80 text-secondary',
    },
    {
      id: 5,
      title: t('moodGreat'),
      desc: t('moodGreatSub'),
      icon: 'wb_sunny',
      bgClass: 'bg-accent-peach/60 text-on-accent-peach',
    },
  ]

  const emotionList = [
    'Anxious',
    'Tired',
    'Grateful',
    'Lonely',
    'Numb',
    'Relieved',
    'Peaceful',
    'Restless',
    'Supported',
  ]

  const contextList = [
    { label: 'Work', icon: 'work_outline' },
    { label: 'Family', icon: 'home' },
    { label: 'Physical pain', icon: 'healing' },
    { label: 'Sleep', icon: 'bed' },
    { label: 'Solitude', icon: 'filter_vintage' },
    { label: 'Weather', icon: 'cloud_upload' },
  ]

  const sleepPhases = [
    { label: 'Broken / Restless', icon: 'bedtime' },
    { label: 'Light & Fragmented', icon: 'nightlight' },
    { label: 'Adequate', icon: 'brightness_medium' },
    { label: 'Deep Rest', icon: 'dark_mode' },
    { label: 'Deep & Refreshing', icon: 'brightness_4' },
  ]

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    )
  }

  const toggleContext = (ctx: string) => {
    setSelectedContext((prev) =>
      prev.includes(ctx) ? prev.filter((c) => c !== ctx) : [...prev, ctx]
    )
  }

  const getEnergyDescription = (val: number) => {
    if (val < 25) return 'Rest needed'
    if (val < 50) return 'Gentle reserve'
    if (val < 75) return 'Steady pacing'
    return 'Bright & capable'
  }

const moodLevelMap: Record<number, string> = {
  1: 'VERY_LOW',
  2: 'LOW',
  3: 'OKAY',
  4: 'GOOD',
  5: 'GREAT',
}

const handleSaveCheckIn = async () => {
  try {
    await api.post('/moods', {
      moodLevel: moodLevelMap[selectedMood],
      moodScore: selectedMood * 20, // maps 1-5 scale to 1-100
      emotionTags: selectedEmotions,
      energyLevel,
      sleepQuality: sleepPhase,
      contextTags: selectedContext,
      note: privateNote || undefined,
    })
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 4000)
  } catch (err) {
    console.error('Failed to save mood entry', err)
  }
}
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header Banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-primary-teal">
              <span className="material-symbols-outlined text-sm">nature_people</span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted font-display">
              {t('sanctuarySpace')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary">
            {t('emotionalCheckIn')}
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            {t('emotionalCheckInSub')}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full shadow-xs self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-xs text-text-secondary">{t('safePrivateEncrypted')}</span>
        </div>
      </section>

      {/* Main Sanctuary Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Check-in Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-surface-card rounded-3xl p-6 sm:p-8 shadow-sm border border-primary-forest/5 flex flex-col gap-8">
            {/* Mood Pebble Selection Area */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="font-display font-semibold text-base sm:text-lg text-text-primary">
                  {t('howAreYouFeeling')}
                </label>
                <span className="text-xs text-text-muted">{t('selectWhatFits')}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {moodOptions.map((option) => {
                  const isSelected = selectedMood === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedMood(option.id)}
                      className={`text-left flex flex-col justify-between p-4 rounded-2xl transition-all cursor-pointer h-36 ${
                        isSelected
                          ? 'bg-container-sage shadow-sm ring-1 ring-primary-teal/30 scale-[1.02]'
                          : 'bg-surface-container-low hover:bg-surface-container-high'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${option.bgClass}`}
                      >
                        <span className="material-symbols-outlined text-xl">{option.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs sm:text-sm text-text-primary">
                          {option.title}
                        </span>
                        <span className="text-[11px] text-text-muted leading-tight mt-0.5">
                          {option.desc}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Emotion Multi-Select Pills */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="font-display font-semibold text-sm sm:text-base text-text-primary">
                  {t('wordsResonate')}
                </label>
                <span className="text-xs text-text-muted">{t('chooseAsMany')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {emotionList.map((emotion) => {
                  const isChosen = selectedEmotions.includes(emotion)
                  return (
                    <button
                      key={emotion}
                      type="button"
                      onClick={() => toggleEmotion(emotion)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all cursor-pointer ${
                        isChosen
                          ? 'bg-container-sage text-primary-forest font-semibold shadow-xs'
                          : 'bg-surface-container-low text-text-secondary hover:bg-surface-container-high'
                      }`}
                    >
                      {emotion}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Energy & Sleep Sliders Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-surface-oat rounded-2xl">
              {/* Energy Level Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-semibold text-text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-teal text-base">
                      battery_charging_full
                    </span>
                    {t('energyLevel')}
                  </span>
                  <span className="text-xs font-semibold text-primary-teal">
                    {getEnergyDescription(energyLevel)} ({energyLevel}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                  className="w-full accent-primary-teal bg-surface-dim rounded-full h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text-muted px-1">
                  <span>{t('depleted')}</span>
                  <span>{t('restored')}</span>
                </div>
              </div>

              {/* Moon Sleep Selector */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-semibold text-text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-teal text-base">
                      nights_stay
                    </span>
                    {t('lastNightsSleep')}
                  </span>
                  <span className="text-xs font-semibold text-primary-teal">
                    {sleepPhase}
                  </span>
                </div>
                <div className="flex items-center justify-between px-1 py-1">
                  {sleepPhases.map((phase) => {
                    const isSelected = sleepPhase === phase.label
                    return (
                      <button
                        key={phase.label}
                        type="button"
                        onClick={() => setSleepPhase(phase.label)}
                        className={`p-1.5 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary-teal text-white scale-110 shadow-xs'
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                        title={phase.label}
                      >
                        <span className="material-symbols-outlined text-xl">{phase.icon}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="flex justify-between text-[11px] text-text-muted px-1">
                  <span>{t('fitful')}</span>
                  <span>{t('deeplyRestorative')}</span>
                </div>
              </div>
            </div>

            {/* Context Pills */}
            <div className="flex flex-col gap-3">
              <span className="font-display font-semibold text-sm sm:text-base text-text-primary">
                {t('keyContext')}
              </span>
              <div className="flex flex-wrap gap-2">
                {contextList.map((ctx) => {
                  const isSelected = selectedContext.includes(ctx.label)
                  return (
                    <button
                      key={ctx.label}
                      type="button"
                      onClick={() => toggleContext(ctx.label)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-secondary-container text-text-primary font-semibold shadow-xs'
                          : 'bg-surface-container-low text-text-secondary hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{ctx.icon}</span>
                      <span>{ctx.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Private Note Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="private-note-input"
                  className="font-display font-semibold text-sm sm:text-base text-text-primary"
                >
                  {t('privateNote')}
                </label>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">lock</span>
                  Completely private
                </span>
              </div>
              <textarea
                id="private-note-input"
                rows={3}
                value={privateNote}
                onChange={(e) => setPrivateNote(e.target.value)}
                placeholder={t('privateNotePlaceholder')}
                className="w-full bg-surface-oat rounded-2xl p-4 text-text-primary placeholder:text-text-muted text-sm outline-none focus:bg-surface-card transition-colors resize-none border border-transparent focus:border-primary-teal/20"
              />
            </div>

            {/* Save Button & Reassurance */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleSaveCheckIn}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-teal hover:bg-primary-forest text-white font-medium text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {isSaved ? 'check' : 'check_circle'}
                  </span>
                  <span>{isSaved ? t('savedWithCare') : t('saveCheckIn')}</span>
                </button>
                <div className="flex items-center gap-1.5 text-text-secondary text-xs text-center sm:text-left">
                  <span className="material-symbols-outlined text-base text-primary-teal">
                    verified_user
                  </span>
                  <span>{t('savedLocallyHaven')}</span>
                </div>
              </div>

              {/* Reassurance panel */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary-container/60 text-text-primary">
                <span className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-primary-teal shrink-0">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </span>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {t('reassuranceToast')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 7-Day Gentle Flow Visualization & Reflections */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 7-Day Gentle Flow Visualization Card */}
          <div className="bg-surface-card rounded-3xl p-6 sm:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
                  {t('emotionalArc')}
                </span>
                <h2 className="text-lg md:text-xl font-display font-bold text-text-primary">
                  {t('past7Days')}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-container-sage text-primary-forest text-xs font-semibold">
                {t('gentleFlow')}
              </span>
            </div>

            {/* SVG Curve Chart */}
            <div className="relative w-full h-44 bg-surface-oat rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-15 flex flex-col justify-between p-4 pointer-events-none">
                <div className="w-full h-px bg-text-muted"></div>
                <div className="w-full h-px bg-text-muted"></div>
                <div className="w-full h-px bg-text-muted"></div>
              </div>

              <svg
                className="w-full h-32 overflow-visible relative z-10"
                viewBox="0 0 340 100"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CFE3D8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#CFE3D8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 75 Q 60 85 110 50 T 210 40 T 280 25 T 330 35 L 330 100 L 10 100 Z"
                  fill="url(#curveGradient)"
                />
                <path
                  d="M 10 75 Q 60 85 110 50 T 210 40 T 280 25 T 330 35"
                  fill="none"
                  stroke="#205B55"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="75" r="4.5" fill="#8B85A8" />
                <circle cx="65" cy="70" r="4.5" fill="#5E827F" />
                <circle cx="120" cy="46" r="4.5" fill="#A8C8B8" />
                <circle cx="175" cy="48" r="4.5" fill="#A8C8B8" />
                <circle cx="230" cy="32" r="4.5" fill="#70AB92" />
                <circle cx="280" cy="25" r="4.5" fill="#357D71" />
                <circle cx="330" cy="35" r="6" fill="#205B55" className="animate-pulse" />
              </svg>

              <div className="flex justify-between text-xs text-text-muted relative z-10 pt-1">
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span className="font-semibold text-primary-teal">Today</span>
              </div>
            </div>

            {/* Compassionate Frequency Marker */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-container-low">
              <span className="p-2.5 rounded-xl bg-accent-sky/50 text-primary-teal shrink-0">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-xs sm:text-sm text-text-primary">
                  {t('checkInsThisWeek', { count: 4 })}
                </span>
                <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                  {t('checkInsThisWeekSub')}
                </p>
              </div>
            </div>
          </div>

          {/* Pattern Reflections & Compassionate Card */}
          <div className="bg-surface-card rounded-3xl p-6 sm:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-teal text-xl">auto_awesome</span>
              <h2 className="text-lg md:text-xl font-display font-bold text-text-primary">
                {t('quietReflections')}
              </h2>
            </div>

            {/* Narrative Insight Card */}
            <div className="p-5 rounded-2xl bg-surface-oat flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider font-display">
                  {t('commonPattern')}
                </span>
                <span className="text-[11px] text-text-muted">{t('observed14Days')}</span>
              </div>
              <p className="text-sm text-text-primary font-medium leading-relaxed">
                “You tend to feel lighter after gentle walks and morning quiet.”
              </p>
              <span className="text-xs text-text-secondary">
                Mornings tagged with ‘Solitude’ had a 40% higher reported feeling of peace.
              </span>
            </div>

            {/* Sanctuary Visual Vignette */}
            <div className="relative rounded-2xl overflow-hidden shadow-xs h-36 bg-gradient-to-t from-primary-forest via-primary-teal to-sage/40 flex flex-col justify-end p-4 text-white">
              <span className="font-display font-bold text-sm">
                Take all the time you need.
              </span>
              <span className="text-xs text-white/85">
                Every season of feeling has its own quiet purpose.
              </span>
            </div>

            {/* Safe Reassurance Footnote */}
            <div className="flex items-center gap-2 px-1 text-text-muted">
              <span className="material-symbols-outlined text-base text-primary-teal shrink-0">
                volunteer_activism
              </span>
              <span className="text-xs leading-tight">
                {t('noMissedDayPenalties')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
