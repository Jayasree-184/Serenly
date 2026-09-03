import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LegacyMigrationBanner } from '../components/layout/LegacyMigrationBanner'

interface GoalItem {
  id: string
  text: string
  desc: string
  status: 'done' | 'in-progress' | 'upcoming'
}

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Gentle Goals
  const [goals, setGoals] = useState<GoalItem[]>([
    {
      id: '1',
      text: 'Drink a glass of warm water',
      desc: 'Gentle hydration to replenish the body after rest.',
      status: 'done',
    },
    {
      id: '2',
      text: 'Take 3 slow breaths by the window',
      desc: 'Feel natural light and let the shoulders drop completely.',
      status: 'in-progress',
    },
    {
      id: '3',
      text: 'Step outside or look at the sky for 5 minutes',
      desc: 'Allow eyes to focus at a far horizon, giving thoughts quiet space.',
      status: 'upcoming',
    },
  ])

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g
        const nextStatus = g.status === 'done' ? 'in-progress' : 'done'
        return { ...g, status: nextStatus }
      })
    )
  }

  // Audio Player
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleAudio = () => {
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

  const skipAudio = (seconds: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime + seconds)
  }

  const completedCount = goals.filter((g) => g.status === 'done').length

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {/* Legacy migration banner for returning users */}
      <LegacyMigrationBanner />

      {/* Top Sanctuary Hero Banner */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-surface-card via-surface-card/90 to-container-sage/20 p-6 md:p-8 shadow-sm border border-primary-forest/5">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-accent-sky/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-container-sage/35 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
                {t('sanctuarySpace')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight">
              {t('goodMorning', { name: 'Maya' })}
            </h1>
            <p className="text-sm md:text-base text-text-secondary italic mt-1 leading-relaxed">
              “You don’t have to do everything today. One small step is enough.”
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-container-low/80 backdrop-blur-md px-4 py-2 rounded-full shadow-xs self-start md:self-auto">
            <span className="material-symbols-outlined text-primary-teal text-base">nest_eco_leaf</span>
            <span className="text-xs text-text-primary font-medium">Breathe pace: unhurried</span>
          </div>
        </div>

        {/* Check-in Quick Launch Card */}
        <div className="relative z-10 mt-6 bg-surface-card/85 backdrop-blur-xl rounded-2xl p-5 md:p-6 shadow-sm border border-primary-forest/5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-container-sage/50 flex items-center justify-center shrink-0 text-primary-teal">
              <span className="material-symbols-outlined text-3xl">cloud</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="font-semibold uppercase tracking-wider font-display">Today</span>
                <span>•</span>
                <span className="text-secondary font-medium">Gentle Awareness</span>
              </div>
              <p className="font-display font-bold text-base sm:text-lg text-text-primary mt-0.5">
                How are you feeling right now?
              </p>
              <p className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-accent-peach"></span>
                <span>Mood status: <strong className="text-text-primary font-medium">Not checked in yet</strong></span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/mood"
              className="group flex items-center justify-center gap-2 bg-primary-teal hover:bg-primary-forest text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(32,91,85,0.25)] hover:shadow-[0_6px_20px_rgba(32,91,85,0.35)] active:scale-95"
            >
              <span className="material-symbols-outlined text-lg transition-transform group-hover:scale-110">
                favorite
              </span>
              <span>Take a gentle check-in</span>
            </Link>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => navigate('/coping')}
                className="flex items-center gap-1 bg-surface-container-low hover:bg-container-sage/60 text-text-primary text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-primary-teal">lens_blur</span>
                <span>Breathe</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/coping')}
                className="flex items-center gap-1 bg-surface-container-low hover:bg-container-sage/60 text-text-primary text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-primary-teal">touch_app</span>
                <span>Ground (5-4-3-2-1)</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/journal')}
                className="flex items-center gap-1 bg-surface-container-low hover:bg-container-sage/60 text-text-primary text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-primary-teal">edit_note</span>
                <span>Reflect / Journal</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/coping')}
                className="flex items-center gap-1 bg-surface-container-low hover:bg-container-sage/60 text-text-primary text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-primary-teal">headphones</span>
                <span>Listen (Calm audio)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sanctuary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Today's Gentle Plan + Weekly Arc + Recent Reflections */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Today's Gentle Plan */}
          <section className="bg-surface-card rounded-3xl p-6 sm:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
                  Pacing Yourself
                </span>
                <h2 className="text-lg md:text-xl font-display font-bold text-text-primary mt-0.5">
                  Today’s Gentle Plan
                </h2>
              </div>
              <span className="text-xs font-medium bg-container-sage/40 text-primary-forest px-3 py-1 rounded-full">
                3 low-pressure micro-steps
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {goals.map((g) => {
                const isDone = g.status === 'done'
                return (
                  <div
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer select-none"
                  >
                    <button
                      type="button"
                      className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform active:scale-90 ${
                        isDone
                          ? 'bg-primary-teal text-white'
                          : 'bg-surface-card text-text-muted hover:text-primary-teal border border-border-hairline shadow-xs'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-base ${isDone ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
                        check
                      </span>
                    </button>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-semibold text-xs sm:text-sm ${isDone ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                          {g.text}
                        </span>
                        {isDone && (
                          <span className="text-xs text-success font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                            Done with ease
                          </span>
                        )}
                        {g.status === 'in-progress' && (
                          <span className="text-xs text-secondary font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                            In progress
                          </span>
                        )}
                        {g.status === 'upcoming' && (
                          <span className="text-xs text-text-muted font-medium">Upcoming</span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                        {g.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-3 flex items-center justify-between flex-wrap gap-2 bg-canvas-cream/60 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs text-text-primary">
                <span className="material-symbols-outlined text-primary-teal text-base">spa</span>
                <span className="font-semibold">{completedCount} of {goals.length} small steps cared for.</span>
                <span className="text-text-muted italic">No rush at all.</span>
              </div>
              <div className="w-36 h-2 rounded-full bg-surface-dim overflow-hidden">
                <div
                  className="h-full bg-primary-teal rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / goals.length) * 100}%` }}
                />
              </div>
            </div>
          </section>

          {/* Weekly Emotional Balance Arc (Validation Over Streaks) */}
          <section className="bg-surface-card rounded-3xl p-6 sm:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted tracking-wider font-display">
                  Validation Over Streaks
                </span>
                <h2 className="text-lg md:text-xl font-display font-bold text-text-primary mt-0.5">
                  Weekly Emotional Balance
                </h2>
              </div>
              <span className="self-start sm:self-auto text-xs bg-accent-sky/50 text-on-accent-sky px-3 py-1 rounded-full font-medium">
                Every feeling is valid.
              </span>
            </div>

            {/* Smooth SVG curve chart */}
            <div className="w-full h-56 rounded-2xl bg-surface-container-low p-4 relative flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-text-muted text-xs px-2 pointer-events-none">
                <span>Expanded & Light</span>
                <span>Steady & Grounded</span>
                <span>Tender & Heavy</span>
              </div>

              <div className="relative w-full h-32 flex items-center justify-center">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 540 120"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="dashGradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#205B55" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#CFE3D8" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="dashStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#476557" />
                      <stop offset="40%" stopColor="#B94A48" />
                      <stop offset="70%" stopColor="#205B55" />
                      <stop offset="100%" stopColor="#8A9A95" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="540" y2="30" stroke="rgba(22,60,58,0.08)" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="0" y1="65" x2="540" y2="65" stroke="rgba(22,60,58,0.08)" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="0" y1="100" x2="540" y2="100" stroke="rgba(22,60,58,0.08)" strokeDasharray="4 4" strokeWidth="1" />
                  <path
                    d="M 40 45 C 90 40, 130 95, 175 90 C 220 85, 250 60, 305 65 C 360 70, 390 35, 435 38 C 470 40, 490 60, 510 60 L 510 120 L 40 120 Z"
                    fill="url(#dashGradientFill)"
                  />
                  <path
                    d="M 40 45 C 90 40, 130 95, 175 90 C 220 85, 250 60, 305 65 C 360 70, 390 35, 435 38 C 470 40, 490 60, 510 60"
                    stroke="url(#dashStrokeGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="40" cy="45" r="5" fill="#FFFFFF" stroke="#476557" strokeWidth="3" />
                  <circle cx="175" cy="90" r="5" fill="#FFFFFF" stroke="#B94A48" strokeWidth="3" />
                  <circle cx="305" cy="65" r="5" fill="#FFFFFF" stroke="#205B55" strokeWidth="3" />
                  <circle cx="435" cy="38" r="5" fill="#FFFFFF" stroke="#476557" strokeWidth="3" />
                  <circle cx="510" cy="60" r="6" fill="#FFFFFF" stroke="#8A9A95" strokeWidth="2" strokeDasharray="2 2" />
                </svg>
              </div>

              <div className="grid grid-cols-5 gap-1 pt-1 text-center text-xs">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-text-primary">Mon</span>
                  <span className="text-secondary text-[11px]">Gentle</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-text-primary">Tue</span>
                  <span className="text-emergency text-[11px]">Heavy</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-text-primary">Wed</span>
                  <span className="text-primary-teal text-[11px]">Resting</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-text-primary">Thu</span>
                  <span className="text-secondary text-[11px]">Steady</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-text-primary">Today</span>
                  <span className="text-text-muted text-[11px] italic">Open</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-text-secondary text-xs flex-wrap gap-2 pt-1">
              <p className="italic">Emotions flow like weather; no pressure to maintain a streak of feeling great.</p>
              <Link to="/mood" className="text-primary-teal hover:underline font-semibold flex items-center gap-1">
                <span>Open past reflections</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </section>

          {/* Recent Reflections Preview Card */}
          <section className="bg-surface-card rounded-3xl p-6 sm:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-lavender/50 text-on-accent-lavender flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">lock</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-text-muted tracking-wider font-display">
                    End-to-End Encrypted
                  </span>
                  <h2 className="font-display font-bold text-base sm:text-lg text-text-primary">
                    Recent Reflections
                  </h2>
                </div>
              </div>

              <Link
                to="/journal"
                className="text-xs text-primary-teal hover:underline font-semibold flex items-center gap-1"
              >
                <span>Write new entry</span>
                <span className="material-symbols-outlined text-base">stylus_note</span>
              </Link>
            </div>

            <div
              onClick={() => navigate('/journal')}
              className="bg-surface-oat/70 rounded-2xl p-5 hover:bg-surface-oat transition-colors cursor-pointer flex flex-col gap-2"
            >
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">Yesterday, 9:15 PM</span>
                  <span>•</span>
                  <span>Evening Unwind</span>
                </div>
                <span className="flex items-center gap-1 bg-surface-card px-2.5 py-0.5 rounded-full text-[11px] text-text-secondary">
                  <span className="material-symbols-outlined text-xs text-primary-teal">security</span>
                  <span>Protected</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-text-primary italic leading-relaxed">
                “Yesterday: Noticed the evening breeze felt comforting. I turned off the overhead lights early and sat on the rug. Didn't push myself to fix things, just felt the floor underneath me...”
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-container-sage/40 text-primary-forest text-[11px] font-medium">
                    #calm
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-sky/40 text-on-accent-sky text-[11px] font-medium">
                    #winddown
                  </span>
                </div>
                <span className="text-xs text-text-muted group-hover:text-primary-teal flex items-center gap-1">
                  <span>Read complete note</span>
                  <span className="material-symbols-outlined text-sm">north_east</span>
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Quick Audio + Medication + Support Village + Whisper */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Quick Calming Audio Card */}
          <section className="bg-gradient-to-b from-surface-card to-surface-container-low rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-teal text-lg">
                  sound_detection_loud_sound
                </span>
                <h3 className="font-display font-bold text-sm sm:text-base text-text-primary">
                  Quick Calming Audio
                </h3>
              </div>
              <span className="text-xs text-text-muted">12 min</span>
            </div>

            {/* Visual Vignette */}
            <div className="relative rounded-2xl overflow-hidden h-36 bg-gradient-to-t from-primary-forest/80 via-primary-forest/20 to-transparent flex flex-col justify-end p-4 text-white">
              <p className="font-display font-bold text-sm">Rain on Cedarwood Leaves</p>
              <p className="text-xs text-container-sage/90">Deep grounding binaural wash</p>
            </div>

            {/* Controls Bar */}
            <div className="bg-surface-card/90 rounded-2xl p-4 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center justify-between">
                {/* 10 Bar Animated Visualizer */}
                <div className="flex items-end gap-1 h-8 px-1">
                  {[30, 60, 40, 75, 25, 80, 50, 90, 40, 60].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: isPlayingAudio ? `${h}%` : '20%' }}
                      className={`w-1 rounded-full bg-primary-teal transition-all duration-300 ${
                        isPlayingAudio ? 'opacity-80' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => skipAudio(-10)}
                    aria-label="Rewind 10 seconds"
                    className="p-1.5 rounded-full text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">replay_10</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleAudio}
                    aria-label="Play or pause"
                    className="w-10 h-10 rounded-full bg-primary-teal text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => skipAudio(10)}
                    aria-label="Forward 10 seconds"
                    className="p-1.5 rounded-full text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">forward_10</span>
                  </button>
                </div>
              </div>

              <audio
                ref={audioRef}
                src="/assets/music/rain.mp3"
                loop
                preload="metadata"
                onEnded={() => setIsPlayingAudio(false)}
              />

              <div className="w-full bg-surface-dim h-1.5 rounded-full overflow-hidden">
                <div className={`bg-primary-teal h-full rounded-full transition-all ${isPlayingAudio ? 'w-1/3' : 'w-1/12'}`} />
              </div>

              <div className="flex justify-between text-[11px] text-text-muted">
                <span>03:12</span>
                <span>12:00</span>
              </div>
            </div>
          </section>

          {/* Gentle Care & Medication Card */}
          <section className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-teal text-lg">medication</span>
                <h3 className="font-display font-bold text-sm sm:text-base text-text-primary">
                  Gentle Care & Medication
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-success"></span>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-xl">done_all</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs sm:text-sm text-text-primary truncate">
                    Sertraline 50mg
                  </span>
                  <span className="text-xs text-success font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    Taken
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">Recorded today at 8:30 AM with breakfast</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-canvas-cream flex items-start gap-2 text-text-muted text-[11px] leading-tight">
              <span className="material-symbols-outlined text-sm mt-0.5 shrink-0">info</span>
              <p>Never change dosage without consulting your healthcare provider. Your rhythm is uniquely yours.</p>
            </div>
          </section>

          {/* Your Support Village Card */}
          <section className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">support_agent</span>
                <h3 className="font-display font-bold text-sm sm:text-base text-text-primary">
                  Your Support Village
                </h3>
              </div>
              <span className="text-xs text-text-muted">Circle of care</span>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-container-low">
              <div className="w-11 h-11 rounded-2xl bg-container-sage text-primary-forest font-bold text-xs flex items-center justify-center shrink-0">
                AR
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-semibold text-xs sm:text-sm text-text-primary truncate">
                  Dr. Ananya Rao
                </span>
                <span className="text-xs text-text-secondary">Licensed Psychotherapist</span>
                <div className="flex items-center gap-1 mt-1 text-primary-teal text-xs font-medium">
                  <span className="material-symbols-outlined text-xs">calendar_today</span>
                  <span>Next: Friday 3:00 PM</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => alert('Opening private conversation note')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-surface-container-low hover:bg-container-sage/40 text-text-primary text-xs font-medium transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-primary-teal">chat_bubble</span>
                <span>Send Note</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Rescheduling calendar assistant')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-surface-container-low hover:bg-container-sage/40 text-text-primary text-xs font-medium transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-primary-teal">schedule</span>
                <span>Reschedule</span>
              </button>
            </div>
          </section>

          {/* Whisper for Today Quote */}
          <section className="bg-surface-oat/80 rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-2">
            <div className="flex items-center gap-1 text-text-muted text-xs font-display uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-accent-peach">format_quote</span>
              <span>Whisper for Today</span>
            </div>
            <blockquote className="text-xs sm:text-sm text-text-primary italic leading-relaxed font-body">
              “Courage doesn’t always roar. Sometimes courage is the quiet voice at the end of the day saying, I will try again tomorrow.”
            </blockquote>
            <div className="text-right text-[11px] text-text-muted">— Mary Anne Radmacher</div>
          </section>
        </div>
      </div>
    </div>
  )
}
