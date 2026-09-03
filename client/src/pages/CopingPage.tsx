import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const CopingPage: React.FC = () => {
  const { t } = useTranslation()

  // Tabs
  const [activeTab, setActiveTab] = useState<'breathing' | 'grounding' | 'music'>('breathing')

  // ----------------------------------------------------
  // Box Breathing State (4-4-4-4)
  // ----------------------------------------------------
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhaseIndex, setBreathPhaseIndex] = useState(0) // 0=Inhale, 1=Hold, 2=Exhale, 3=Rest
  const [countdown, setCountdown] = useState(4)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const breathPhases = [
    { label: t('inhale'), scale: 'scale-125', color: 'bg-container-sage text-primary-forest' },
    { label: t('hold'), scale: 'scale-125', color: 'bg-accent-sky text-on-accent-sky' },
    { label: t('exhale'), scale: 'scale-90', color: 'bg-secondary-container text-secondary' },
    { label: t('rest'), scale: 'scale-90', color: 'bg-surface-dim text-text-secondary' },
  ]

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isBreathing) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setBreathPhaseIndex((p) => (p + 1) % 4)
            return 4
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setCountdown(4)
      setBreathPhaseIndex(0)
    }
    return () => clearInterval(timer)
  }, [isBreathing])

  // ----------------------------------------------------
  // Grounding (5-4-3-2-1) State
  // ----------------------------------------------------
  const [groundingChecks, setGroundingChecks] = useState<boolean[]>([false, false, false, false, false])
  const groundingSteps = [
    { count: '5', text: t('g1'), icon: 'visibility' },
    { count: '4', text: t('g2'), icon: 'touch_app' },
    { count: '3', text: t('g3'), icon: 'hearing' },
    { count: '2', text: t('g4'), icon: 'air' },
    { count: '1', text: t('g5'), icon: 'restaurant' },
  ]

  const toggleGrounding = (index: number) => {
    setGroundingChecks((prev) => {
      const copy = [...prev]
      copy[index] = !copy[index]
      return copy
    })
  }

  // ----------------------------------------------------
  // Audio Player State
  // ----------------------------------------------------
  const audioTracks = [
    { title: t('trackCalm'), src: '/assets/music/calm1.mp3', duration: 'Calm Night', icon: 'nightlight' },
    { title: t('trackRain'), src: '/assets/music/rain.mp3', duration: 'Gentle Rain', icon: 'water_drop' },
    { title: t('trackPiano'), src: '/assets/music/piano.mp3', duration: 'Soft Piano', icon: 'piano' },
  ]

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = isLooping
    }
  }, [volume, isLooping])

  const togglePlayTrack = (index?: number) => {
    if (index !== undefined && index !== currentTrackIndex) {
      setCurrentTrackIndex(index)
      if (audioRef.current) {
        audioRef.current.src = audioTracks[index].src
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      }
      return
    }

    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Header */}
      <section className="flex flex-col gap-1 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-teal"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
            {t('sanctuarySpace')}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary">
          {t('copingSanctuary')}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          {t('copingSanctuarySub')}
        </p>
      </section>

      {/* Sanctuary Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-card border border-primary-forest/5 shadow-xs self-start">
        {[
          { key: 'breathing', label: t('tabBreathing'), icon: 'air' },
          { key: 'grounding', label: t('tabGrounding'), icon: 'nature' },
          { key: 'music', label: t('tabMusic'), icon: 'graphic_eq' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-container-sage text-primary-forest shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-oat'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Box Breathing (4-4-4-4) */}
      {activeTab === 'breathing' && (
        <section className="bg-surface-card rounded-3xl p-6 sm:p-10 shadow-sm border border-primary-forest/5 flex flex-col items-center justify-center gap-8 min-h-[440px]">
          <div className="flex flex-col items-center text-center gap-1 max-w-md">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
              {t('boxBreathingTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              {t('boxBreathingSub')}
            </p>
          </div>

          {/* Interactive Breathing Orb or Reduced-Motion Indicator */}
          {!reducedMotion ? (
            <div className="relative flex items-center justify-center w-64 h-64">
              {/* Subtle outer halo */}
              <div
                className={`absolute w-56 h-56 rounded-full opacity-30 transition-transform duration-1000 ${
                  isBreathing ? breathPhases[breathPhaseIndex].scale : 'scale-100'
                } bg-primary-teal/20`}
              />
              {/* Inner animated orb */}
              <div
                className={`w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform duration-1000 ease-in-out ${
                  isBreathing ? breathPhases[breathPhaseIndex].scale : 'scale-100'
                } ${
                  isBreathing ? breathPhases[breathPhaseIndex].color : 'bg-container-sage text-primary-forest'
                }`}
              >
                <span className="font-display font-bold text-xl tracking-wide">
                  {isBreathing ? breathPhases[breathPhaseIndex].label : t('inhale')}
                </span>
                {isBreathing && (
                  <span className="text-2xl font-display font-extrabold mt-1">
                    {countdown}s
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Reduced Motion Fallback Mode */
            <div className="flex flex-col items-center gap-4 w-full max-w-md p-6 bg-surface-oat rounded-2xl">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t('reducedMotionMode')}
              </span>
              <div className="text-2xl font-display font-bold text-primary-teal">
                {isBreathing ? breathPhases[breathPhaseIndex].label : t('inhale')} — {countdown}s
              </div>
              <div className="w-full bg-surface-dim rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary-teal h-full transition-all duration-1000"
                  style={{ width: `${((4 - countdown + 1) / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Trigger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsBreathing(!isBreathing)}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer ${
                isBreathing
                  ? 'bg-surface-oat text-text-primary hover:bg-surface-dim'
                  : 'bg-primary-teal text-white hover:bg-primary-forest'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {isBreathing ? 'pause' : 'play_arrow'}
              </span>
              <span>{isBreathing ? t('btnStop') : t('btnStart')}</span>
            </button>
          </div>
        </section>
      )}

      {/* Tab 2: 5-4-3-2-1 Sensory Grounding */}
      {activeTab === 'grounding' && (
        <section className="bg-surface-card rounded-3xl p-6 sm:p-8 shadow-sm border border-primary-forest/5 flex flex-col gap-6 max-w-3xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
              {t('groundingTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              {t('groundingSub')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {groundingSteps.map((step, idx) => {
              const isChecked = groundingChecks[idx]
              return (
                <div
                  key={idx}
                  onClick={() => toggleGrounding(idx)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer select-none ${
                    isChecked
                      ? 'bg-secondary-container/50 text-text-secondary'
                      : 'bg-surface-container-low hover:bg-surface-container-high text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-surface-card flex items-center justify-center font-display font-bold text-primary-teal text-sm shadow-xs shrink-0">
                      {step.count}
                    </span>
                    <span className="material-symbols-outlined text-text-muted text-xl">
                      {step.icon}
                    </span>
                    <span className={`text-xs sm:text-sm ${isChecked ? 'line-through opacity-80' : 'font-medium'}`}>
                      {step.text}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-primary-teal text-white'
                        : 'border-2 border-text-muted/40 bg-surface-card'
                    }`}
                  >
                    {isChecked && <span className="material-symbols-outlined text-base">check</span>}
                  </button>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
            <span className="text-xs text-text-muted">
              {groundingChecks.filter(Boolean).length} of 5 completed
            </span>
            <button
              type="button"
              onClick={() => setGroundingChecks([true, true, true, true, true])}
              className="px-6 py-2 rounded-full bg-container-sage text-primary-forest font-semibold text-xs transition-transform active:scale-95 cursor-pointer"
            >
              {t('btnDone')}
            </button>
          </div>
        </section>
      )}

      {/* Tab 3: Calming Soundscapes (Web Audio) */}
      {activeTab === 'music' && (
        <section className="bg-surface-card rounded-3xl p-6 sm:p-8 shadow-sm border border-primary-forest/5 flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
              {t('musicTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Natural acoustic sounds and frequencies to ground your nervous system.
            </p>
          </div>

          {/* Active Track Banner */}
          <div className="bg-surface-oat rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-container-sage flex items-center justify-center text-primary-teal shadow-xs">
                <span className="material-symbols-outlined text-2xl">
                  {audioTracks[currentTrackIndex].icon}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-text-primary">
                  {audioTracks[currentTrackIndex].title}
                </h3>
                <span className="text-xs text-text-secondary">
                  {audioTracks[currentTrackIndex].duration}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => togglePlayTrack()}
              className="w-12 h-12 rounded-full bg-primary-teal hover:bg-primary-forest text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Hidden native audio element */}
          <audio
            ref={audioRef}
            src={audioTracks[currentTrackIndex].src}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => {
              if (!isLooping) setIsPlaying(false)
            }}
          />

          {/* Progress & Volume Controls */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 180)}</span>
            </div>
            <div className="w-full bg-surface-dim rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary-teal h-full transition-all"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-muted text-base">
                  {volume === 0 ? 'volume_off' : 'volume_up'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 accent-primary-teal bg-surface-dim rounded-full h-1.5 cursor-pointer"
                />
              </div>

              {/* Loop Toggle */}
              <button
                type="button"
                onClick={() => setIsLooping(!isLooping)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  isLooping
                    ? 'bg-container-sage text-primary-forest'
                    : 'bg-surface-oat text-text-secondary hover:bg-surface-dim'
                }`}
              >
                <span className="material-symbols-outlined text-sm">repeat</span>
                <span>{isLooping ? t('loopOn') : t('loop')}</span>
              </button>
            </div>
          </div>

          {/* Playlist Track List */}
          <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-high">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider font-display">
              Sound Library
            </span>
            <div className="flex flex-col gap-1.5">
              {audioTracks.map((track, i) => (
                <div
                  key={track.src}
                  onClick={() => togglePlayTrack(i)}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-colors cursor-pointer ${
                    currentTrackIndex === i
                      ? 'bg-container-sage/60 font-semibold text-primary-forest'
                      : 'bg-surface-container-low hover:bg-surface-container-high text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-teal text-lg">
                      {track.icon}
                    </span>
                    <span className="text-xs sm:text-sm">{track.title}</span>
                  </div>
                  {currentTrackIndex === i && isPlaying && (
                    <span className="w-2 h-2 rounded-full bg-primary-teal animate-pulse"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
