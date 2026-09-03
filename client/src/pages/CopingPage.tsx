import React, { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'

interface CadencePattern {
  name: string
  key: 'box' | 'relax' | 'flow'
  stages: { text: string; duration: number; scale: string }[]
}

export const CopingPage: React.FC = () => {
  const { openEmergency } = useOutletContext<{ openEmergency?: () => void }>() || {}

  // Practices active tab
  const [activePractice, setActivePractice] = useState<
    'orb' | 'grounding' | 'bodyscan' | 'sounds' | 'quick'
  >('orb')

  // Cadences
  const cadences: Record<'box' | 'relax' | 'flow', CadencePattern> = {
    box: {
      name: 'Box (4-4-4-4)',
      key: 'box',
      stages: [
        { text: 'Inhale gently...', duration: 4, scale: 'scale-125' },
        { text: 'Hold softly...', duration: 4, scale: 'scale-125' },
        { text: 'Exhale slowly...', duration: 4, scale: 'scale-100' },
        { text: 'Rest peacefully...', duration: 4, scale: 'scale-100' },
      ],
    },
    relax: {
      name: '4-7-8 Relax',
      key: 'relax',
      stages: [
        { text: 'Inhale gently...', duration: 4, scale: 'scale-125' },
        { text: 'Hold deeply...', duration: 7, scale: 'scale-125' },
        { text: 'Exhale completely...', duration: 8, scale: 'scale-95' },
      ],
    },
    flow: {
      name: 'Flow (4-6)',
      key: 'flow',
      stages: [
        { text: 'Inhale smoothly...', duration: 4, scale: 'scale-120' },
        { text: 'Exhale softly...', duration: 6, scale: 'scale-100' },
      ],
    },
  }

  const [cadenceKey, setCadenceKey] = useState<'box' | 'relax' | 'flow'>('box')
  const [stageIndex, setStageIndex] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(4)
  const [isRunning, setIsRunning] = useState(true)
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<'rain' | 'bowls' | 'silent'>('rain')
  const [selectedDuration, setSelectedDuration] = useState('5m')

  // Ambient soundscape audio
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingSound, setPlayingSound] = useState<string | null>(null)

  const playAmbientSound = (src: string, title: string) => {
    if (!audioRef.current) return
    if (playingSound === title) {
      audioRef.current.pause()
      setPlayingSound(null)
    } else {
      audioRef.current.src = src
      audioRef.current
        .play()
        .then(() => setPlayingSound(title))
        .catch(() => setPlayingSound(null))
    }
  }

  // Ticking breathing rhythm
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setStageIndex((curr) => {
              const next = (curr + 1) % cadences[cadenceKey].stages.length
              return next
            })
            return cadences[cadenceKey].stages[(stageIndex + 1) % cadences[cadenceKey].stages.length].duration
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, cadenceKey, stageIndex])

  const handleReset = () => {
    setStageIndex(0)
    setRemainingSeconds(cadences[cadenceKey].stages[0].duration)
    setIsRunning(true)
  }

  const currentStage = cadences[cadenceKey].stages[stageIndex]

  // 5-4-3-2-1 Grounding Items
  const [groundingChecks, setGroundingChecks] = useState<boolean[]>([true, true, false, false, false])
  const groundingItems = [
    {
      num: '5',
      title: '5 Things you can see',
      desc: 'Scan your space. Notice shadows, textures, colors, or plants around you.',
      icon: 'visibility',
    },
    {
      num: '4',
      title: '4 Things you can physically feel',
      desc: 'The seat beneath you, soft fabric on your sleeve, feet flat on the floor.',
      icon: 'touch_app',
    },
    {
      num: '3',
      title: '3 Things you can hear',
      desc: 'Distal car hums, wind against the window pane, the cadence of your breath.',
      icon: 'hearing',
    },
    {
      num: '2',
      title: '2 Things you can smell',
      desc: 'Fresh air, brewed tea, essential oils, or simply clean fabric.',
      icon: 'view_in_ar_new',
    },
    {
      num: '1',
      title: '1 Thing you can taste or 1 positive truth',
      desc: 'A sip of cool water, mint, or the grounded truth: “I am safe in this room right now.”',
      icon: 'favorite',
    },
  ]

  const toggleGroundingItem = (index: number) => {
    setGroundingChecks((prev) => {
      const copy = [...prev]
      copy[index] = !copy[index]
      return copy
    })
  }

  const groundedCount = groundingChecks.filter(Boolean).length

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-16">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-display">
              Nervous System Anchor
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight">
            Coping Sanctuary
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Gentle somatic tools to soothe your nervous system in this exact moment.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-surface-container-high rounded-full shadow-xs self-start md:self-auto">
          <span className="material-symbols-outlined text-primary-teal text-base">shield_moon</span>
          <span className="text-xs text-text-secondary">Private somatic session • No pacing pressure</span>
        </div>
      </section>

      {/* Practice Selector Pills */}
      <nav
        aria-label="Sanctuary practices"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
      >
        {[
          { key: 'orb', label: 'Breathing Orb', icon: 'air' },
          { key: 'grounding', label: '5-4-3-2-1 Grounding', icon: 'visibility' },
          { key: 'bodyscan', label: 'Body Scan', icon: 'self_improvement' },
          { key: 'sounds', label: 'Calming Sounds', icon: 'graphic_eq' },
          { key: 'quick', label: 'Quick Relief (< 2 min)', icon: 'bolt' },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActivePractice(item.key as any)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activePractice === item.key
                ? 'bg-container-sage text-text-primary shadow-xs'
                : 'bg-surface-container-low text-text-secondary hover:bg-surface-container-high hover:text-text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Hero Breathing Orb Card */}
      <section className="relative overflow-hidden rounded-3xl bg-surface-card shadow-sm border border-primary-forest/5 p-6 md:p-10 flex flex-col items-center">
        {/* Ambient Blur background discs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-accent-sky/40 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-container-sage/40 blur-3xl pointer-events-none"></div>

        {/* Cadence Header */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-teal text-xl">nest_eco_leaf</span>
            <span className="font-display font-semibold text-xs sm:text-sm text-text-primary">
              Rhythmic Somatic Pacing
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 bg-surface-container-low p-1 rounded-full shadow-inner">
            {(['box', 'relax', 'flow'] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setCadenceKey(k)
                  setStageIndex(0)
                  setRemainingSeconds(cadences[k].stages[0].duration)
                }}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  cadenceKey === k
                    ? 'bg-surface-card text-text-primary shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {cadences[k].name}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Breathing Orb Center */}
        <div className="relative flex flex-col items-center justify-center my-10 md:my-14 min-h-[320px] w-full z-10">
          <div
            className={`relative flex items-center justify-center transition-transform duration-1000 ease-in-out ${
              isRunning ? currentStage.scale : 'scale-100'
            }`}
          >
            <div className="absolute w-72 h-72 rounded-full bg-container-sage/30 animate-pulse"></div>
            <div className="absolute w-60 h-60 rounded-full bg-accent-sky/50 blur-md"></div>
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-primary-teal via-secondary to-primary-forest text-white shadow-xl flex flex-col items-center justify-center text-center p-4">
              <span className="font-display font-bold text-base sm:text-lg select-none tracking-tight">
                {currentStage.text}
              </span>
              <span className="text-xl sm:text-2xl font-display font-extrabold select-none mt-1 text-accent-sky">
                {remainingSeconds}s
              </span>
            </div>
          </div>

          {/* Somatic Checkpoints */}
          <div className="flex items-center gap-3 mt-8 text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-teal"></span>
              <span>Chest soft</span>
            </div>
            <span className="text-text-muted">•</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Jaw relaxed</span>
            </div>
            <span className="text-text-muted">•</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent-peach"></span>
              <span>Belly expanding</span>
            </div>
          </div>
        </div>

        {/* Bottom Orb Bar: Atmosphere + Time + Controls */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 bg-surface-container-low/70 backdrop-blur-md rounded-2xl p-4 md:px-6 z-10">
          {/* Atmosphere Selection */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              Atmosphere
            </span>
            <div className="flex items-center gap-1">
              {[
                { key: 'rain', label: 'Soft Rain', icon: 'rainy' },
                { key: 'bowls', label: 'Singing Bowls', icon: 'notifications_active' },
                { key: 'silent', label: 'Silent', icon: 'volume_off' },
              ].map((atm) => (
                <button
                  key={atm.key}
                  type="button"
                  onClick={() => setSelectedAtmosphere(atm.key as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${
                    selectedAtmosphere === atm.key
                      ? 'bg-surface-card text-text-primary font-semibold shadow-xs'
                      : 'text-text-secondary hover:bg-surface-card'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm text-primary-teal">{atm.icon}</span>
                  <span>{atm.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              Time
            </span>
            <div className="flex items-center gap-1">
              {['3m', '5m', '10m'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDuration(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    selectedDuration === d
                      ? 'bg-surface-card text-text-primary font-semibold shadow-xs'
                      : 'text-text-secondary hover:bg-surface-card'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Reset & Pause/Resume */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset Breathing Cycle"
              className="p-2 rounded-xl bg-surface-card text-text-secondary hover:text-text-primary transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-base">restart_alt</span>
            </button>
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-2 rounded-full bg-primary-teal text-white font-semibold text-xs shadow-md hover:bg-primary-forest transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">
                {isRunning ? 'pause' : 'play_arrow'}
              </span>
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lower Dual Columns: Grounding (7 cols) + Quick Calm & Soundscapes (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): 5-4-3-2-1 Sensory Grounding */}
        <article className="lg:col-span-7 bg-surface-card rounded-3xl p-6 sm:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-container-sage/60 flex items-center justify-center text-primary-teal shrink-0">
                <span className="material-symbols-outlined">filter_5</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-base sm:text-lg text-text-primary">
                  5-4-3-2-1 Sensory Grounding
                </h2>
                <p className="text-xs text-text-secondary">
                  Anchors your attention right back to physical reality.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-surface-container-high text-text-secondary">
              Active Anchor
            </span>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            {groundingItems.map((item, index) => {
              const isChecked = groundingChecks[index]
              return (
                <label
                  key={item.num}
                  onClick={() => toggleGroundingItem(index)}
                  className="group flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-oat transition-all cursor-pointer shadow-xs select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 rounded-md accent-primary-teal cursor-pointer"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs sm:text-sm font-semibold ${isChecked ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                        {item.title}
                      </span>
                      <span className="material-symbols-outlined text-xs text-primary-teal">
                        {item.icon}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </label>
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-text-secondary border-t border-surface-container-high">
            <span>Progress: {groundedCount} of 5 grounded</span>
            <button
              type="button"
              onClick={() => setGroundingChecks([false, false, false, false, false])}
              className="text-primary-teal hover:underline font-semibold cursor-pointer"
            >
              Reset Anchors
            </button>
          </div>
        </article>

        {/* Right Column (5 cols): Quick Calm Tools + Ambient Soundscapes */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Quick Calm Tools */}
          <section className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-accent-peach">
                  local_fire_department
                </span>
                <h3 className="font-display font-bold text-sm sm:text-base text-text-primary">
                  Quick Calm Tools
                </h3>
              </div>
              <span className="text-[11px] font-semibold bg-accent-peach/30 text-on-accent-peach px-2.5 py-0.5 rounded-full">
                Fast somatic shifts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Tool 1 */}
              <div
                onClick={() => alert('Starting 90s mammalian dive reflex countdown timer...')}
                className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-oat transition-all cursor-pointer flex flex-col gap-1 shadow-xs"
              >
                <div className="w-8 h-8 rounded-xl bg-accent-sky flex items-center justify-center text-on-accent-sky">
                  <span className="material-symbols-outlined text-base">ac_unit</span>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-text-primary mt-1">
                  Ice on Wrists
                </h4>
                <p className="text-[11px] text-text-secondary leading-tight">
                  90s temperature reset triggers mammalian dive reflex to drop heart rate.
                </p>
                <span className="text-[11px] font-semibold text-primary-teal mt-1 flex items-center gap-1">
                  <span>Start 90s timer</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </div>

              {/* Tool 2 */}
              <div
                onClick={() => alert('Guide: Inhale twice through nose deeply, then long relaxed sigh out through mouth.')}
                className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-oat transition-all cursor-pointer flex flex-col gap-1 shadow-xs"
              >
                <div className="w-8 h-8 rounded-xl bg-container-sage flex items-center justify-center text-primary-forest">
                  <span className="material-symbols-outlined text-base">air</span>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-text-primary mt-1">
                  Physiological Sigh
                </h4>
                <p className="text-[11px] text-text-secondary leading-tight">
                  Two quick deep inhales through nose, followed by a long relaxed sigh out.
                </p>
                <span className="text-[11px] font-semibold text-primary-teal mt-1 flex items-center gap-1">
                  <span>3 gentle reps</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </div>
            </div>
          </section>

          {/* Ambient Soundscapes */}
          <section className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-teal">surround_sound</span>
                <h3 className="font-display font-bold text-sm sm:text-base text-text-primary">
                  Ambient Soundscapes
                </h3>
              </div>
              <span className="text-xs text-text-muted">Stereo Field</span>
            </div>

            <div className="flex flex-col gap-2">
              {[
                {
                  title: 'Forest Dawn',
                  sub: 'Soft birdsong & pine wind',
                  src: '/assets/music/calm1.mp3',
                  gradient: 'from-emerald-800 to-teal-900',
                },
                {
                  title: 'Distant Shoreline',
                  sub: 'Gentle low frequency tide',
                  src: '/assets/music/rain.mp3',
                  gradient: 'from-cyan-800 to-blue-900',
                },
                {
                  title: 'Warm Fireplace',
                  sub: 'Subtle wood crackle & warmth',
                  src: '/assets/music/piano.mp3',
                  gradient: 'from-amber-800 to-stone-900',
                },
              ].map((sound) => {
                const isThisPlaying = playingSound === sound.title
                return (
                  <div
                    key={sound.title}
                    onClick={() => playAmbientSound(sound.src, sound.title)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low hover:bg-surface-oat transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${sound.gradient} flex items-center justify-center text-white shrink-0`}>
                        <span className="material-symbols-outlined text-lg">
                          {isThisPlaying ? 'equalizer' : 'music_note'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs sm:text-sm text-text-primary">
                          {sound.title}
                        </span>
                        <span className="text-[11px] text-text-muted">{sound.sub}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-text-primary hover:bg-primary-teal hover:text-white transition-all shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">
                        {isThisPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} loop onEnded={() => setPlayingSound(null)} />

      {/* Reassurance Companion Footer */}
      <footer className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-primary-forest/5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-emergency text-xl shrink-0">
            support_agent
          </span>
          <p className="text-xs text-text-secondary leading-relaxed">
            If you feel overwhelmed and need human voice support, tap{' '}
            <strong
              onClick={openEmergency}
              className="text-emergency font-semibold underline cursor-pointer"
            >
              Get Help Now
            </strong>{' '}
            in the side companion bar at any time.
          </p>
        </div>
        <span className="text-xs text-text-muted whitespace-nowrap font-medium">
          Free • 24/7 • Confidential
        </span>
      </footer>
    </div>
  )
}
