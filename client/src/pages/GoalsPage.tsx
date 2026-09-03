import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface GoalItem {
  id: string
  text: string
  done: boolean
}

export const GoalsPage: React.FC = () => {
  const { t } = useTranslation()

  const [goals, setGoals] = useState<GoalItem[]>([
    { id: '1', text: 'Drink a glass of water', done: true },
    { id: '2', text: 'Stand near sunlight for 2 minutes', done: false },
    { id: '3', text: 'Take a quiet breath before opening messages', done: false },
    { id: '4', text: 'Eat a small warm meal or snack', done: false },
    { id: '5', text: 'Step outside for 5 minutes', done: false },
  ])
  const [newGoalText, setNewGoalText] = useState('')

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    )
  }

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGoalText.trim()) return
    const newG: GoalItem = {
      id: Date.now().toString(),
      text: newGoalText.trim(),
      done: false,
    }
    setGoals((prev) => [...prev, newG])
    setNewGoalText('')
  }

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  const completedCount = goals.filter((g) => g.done).length

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-3xl animate-fade-in">
      {/* Header */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-teal"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
            {t('sanctuarySpace')}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary">
          {t('goalsTitle')}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          {t('goalsSub')}
        </p>
      </section>

      {/* Progress Card */}
      <div className="bg-surface-card rounded-3xl p-6 sm:p-7 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-sm sm:text-base text-text-primary">
            Today's Compassionate Pace
          </span>
          <span className="px-3 py-1 rounded-full bg-container-sage text-primary-forest text-xs font-semibold">
            {completedCount} of {goals.length} completed
          </span>
        </div>

        <div className="w-full bg-surface-oat rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary-teal h-full transition-all duration-500"
            style={{ width: `${goals.length ? (completedCount / goals.length) * 100 : 0}%` }}
          />
        </div>

        <p className="text-xs text-text-muted italic">
          “You don't need to finish everything today. Even doing one small thing is worthy of celebration.”
        </p>
      </div>

      {/* Add Goal Form */}
      <form onSubmit={handleAddGoal} className="flex gap-3">
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder={t('addGoal')}
          className="flex-1 bg-surface-card rounded-2xl px-5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none shadow-xs border border-primary-forest/5 focus:border-primary-teal/20"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-primary-teal hover:bg-primary-forest text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {t('btnAdd')}
        </button>
      </form>

      {/* Goals List */}
      <div className="flex flex-col gap-2.5">
        {goals.map((g) => (
          <div
            key={g.id}
            className={`flex items-center justify-between p-4 rounded-2xl transition-all border border-primary-forest/5 select-none ${
              g.done
                ? 'bg-secondary-container/40 text-text-secondary'
                : 'bg-surface-card text-text-primary hover:bg-surface-oat/60'
            }`}
          >
            <div
              className="flex items-center gap-3.5 flex-1 cursor-pointer"
              onClick={() => toggleGoal(g.id)}
            >
              <button
                type="button"
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                  g.done ? 'bg-primary-teal text-white' : 'border-2 border-text-muted/40 bg-surface-card'
                }`}
              >
                {g.done && <span className="material-symbols-outlined text-base">check</span>}
              </button>
              <span className={`text-sm ${g.done ? 'line-through opacity-75' : 'font-medium'}`}>
                {g.text}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteGoal(g.id)}
              className="p-1 text-text-muted hover:text-emergency transition-colors cursor-pointer"
              title="Remove goal"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
