import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LegacyMigrationBanner } from '../components/layout/LegacyMigrationBanner'

export const DashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation()

  // Affirmations
  const affirmationsEN = [
    'You are not alone.',
    'This feeling will pass — slowly, gently.',
    'Small steps still count.',
    'You matter.',
    'Even being here is progress.',
  ]
  const affirmationsTA = [
    'நீங்கள் தனியாக இல்லை.',
    'இந்த உணர்வு மெதுவாக மாறும் — மென்மையாக.',
    'சிறிய முன்னேற்றங்களும் மதிப்புள்ளது.',
    'நீங்கள் முக்கியமானவர்.',
    'இங்கே இருப்பதும் ஒரு முன்னேற்றமே.',
  ]

  const [currentAffirmation, setCurrentAffirmation] = useState('')

  useEffect(() => {
    const list = i18n.language === 'ta' ? affirmationsTA : affirmationsEN
    setCurrentAffirmation(list[Math.floor(Math.random() * list.length)])
  }, [i18n.language])

  // Gentle goals state
  const [goals, setGoals] = useState([
    { id: '1', text: 'Drink a glass of water', done: true },
    { id: '2', text: 'Stand near a sunlit window for 2 minutes', done: false },
    { id: '3', text: 'Rest your eyes and breathe gently', done: false },
  ])

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    )
  }

  // Audio player snippet
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlayAudio = () => {
    if (!audioRef.current) return
    if (isPlayingAudio) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false))
    }
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Legacy migration banner if returning user has localStorage records */}
      <LegacyMigrationBanner />

      {/* Hero Sanctuary Banner */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-surface-card via-surface-card/90 to-container-sage/30 p-6 md:p-8 shadow-sm border border-primary-forest/5">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-teal animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
                {t('sanctuarySpace')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight">
              {t('goodMorning', { name: 'Maya' })}
            </h1>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              “{currentAffirmation}” {t('supportiveStatement')}
            </p>
          </div>

          <Link
            to="/mood"
            className="self-start lg:self-center flex items-center justify-center gap-2.5 bg-primary-teal hover:bg-primary-forest text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(32,91,85,0.25)] hover:shadow-[0_6px_20px_rgba(32,91,85,0.35)] active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">mood</span>
            <span>Check in with your day</span>
          </Link>
        </div>
      </section>

      {/* 2-Column Grid of Core Sanctuary Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Today's Gentle Plan + Weekly Arc */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Today's Gentle Plan */}
          <section className="bg-surface-card rounded-3xl p-6 md:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
                  Daily Rhythm
                </span>
                <h2 className="text-lg md:text-xl font-display font-bold text-text-primary">
                  {t('todaysGentlePlan')}
                </h2>
              </div>
              <span className="text-xs text-text-muted">
                {goals.filter((g) => g.done).length} of {goals.length} completed
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all cursor-pointer select-none ${
                    goal.done
                      ? 'bg-secondary-container/40 text-text-secondary'
                      : 'bg-surface-container-low hover:bg-surface-container-high text-text-primary'
                  }`}
                >
                  <button
                    type="button"
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      goal.done
                        ? 'bg-primary-teal text-white'
                        : 'border-2 border-text-muted/40 bg-surface-card'
                    }`}
                  >
                    {goal.done && <span className="material-symbols-outlined text-base">check</span>}
                  </button>
                  <span className={`text-sm ${goal.done ? 'line-through opacity-75' : 'font-medium'}`}>
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-text-muted border-t border-surface-container-high">
              <span className="italic">No deadlines. Complete only if it feels kind.</span>
              <Link to="/goals" className="text-primary-teal font-semibold hover:underline">
                View all goals &rarr;
              </Link>
            </div>
          </section>

          {/* Weekly Emotional Balance Arc */}
          <section className="bg-surface-card rounded-3xl p-6 md:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
                  {t('emotionalArc')}
                </span>
                <h2 className="text-lg md:text-xl font-display font-bold text-text-primary">
                  {t('weeklyEmotionalBalance')}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-container-sage text-primary-forest text-xs font-semibold">
                {t('gentleFlow')}
              </span>
            </div>

            {/* Smooth SVG chart */}
            <div className="relative w-full h-44 bg-surface-oat rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-20 flex flex-col justify-between p-4 pointer-events-none">
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
                  <linearGradient id="dashGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CFE3D8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#CFE3D8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 75 Q 60 85 110 50 T 210 40 T 280 25 T 330 35 L 330 100 L 10 100 Z"
                  fill="url(#dashGradient)"
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

            <p className="text-xs text-text-secondary leading-relaxed">
              {t('checkInsThisWeekSub')}
            </p>
          </section>
        </div>

        {/* Right Column (5 cols): Quick Audio + Recent Reflections + Coping Access */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Quick Calming Audio Card */}
          <section className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-teal text-xl">graphic_eq</span>
                <h3 className="font-display font-bold text-text-primary text-base">
                  {t('quickCalmingAudio')}
                </h3>
              </div>
              <span className="text-xs text-text-muted">Soft Rain</span>
            </div>

            {/* Visualizer & Play Bar */}
            <div className="bg-surface-oat rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-end gap-1 h-8">
                {[40, 70, 50, 90, 60, 80, 45, 65, 85, 30].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isPlayingAudio ? `${h}%` : '25%' }}
                    className={`w-1 rounded-full bg-primary-teal transition-all duration-300 ${
                      isPlayingAudio ? 'opacity-80' : 'opacity-40'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={togglePlayAudio}
                className="w-10 h-10 rounded-full bg-primary-teal text-white flex items-center justify-center shadow-md hover:bg-primary-forest transition-transform active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">
                  {isPlayingAudio ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            <audio
              ref={audioRef}
              src="/assets/music/rain.mp3"
              loop
              preload="metadata"
              onEnded={() => setIsPlayingAudio(false)}
            />

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Calming frequency (Alpha waves)</span>
              <Link to="/coping" className="text-primary-teal font-semibold hover:underline">
                More sounds &rarr;
              </Link>
            </div>
          </section>

          {/* Quick Coping Tools Buttons */}
          <section className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-3">
            <h3 className="font-display font-bold text-text-primary text-base">
              {t('quickCoping')}
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/coping"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface-container-low hover:bg-container-sage/50 transition-colors text-xs font-semibold text-text-primary"
              >
                <span className="material-symbols-outlined text-primary-teal text-lg">air</span>
                <span>Box Breathing</span>
              </Link>
              <Link
                to="/coping"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface-container-low hover:bg-container-sage/50 transition-colors text-xs font-semibold text-text-primary"
              >
                <span className="material-symbols-outlined text-secondary text-lg">nature</span>
                <span>5-4-3-2-1 Grounding</span>
              </Link>
            </div>
          </section>

          {/* Recent Reflections Preview */}
          <section className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-text-primary text-base">
                {t('recentReflections')}
              </h3>
              <Link to="/journal" className="text-xs text-primary-teal font-semibold hover:underline">
                {t('viewAll')}
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-surface-oat/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-text-primary">“Letting today just be what it is”</span>
                <span className="text-text-muted">Today</span>
              </div>
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                Woke up with that heavy fog in my chest again. Decided not to fight it or get frustrated with myself. Made chamomile tea...
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
