import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface MedicationItem {
  id: string
  name: string
  dose: string
  time: string
  frequency: string
  taken: boolean
}

export const MedicationPage: React.FC = () => {
  const { t } = useTranslation()

  const [meds, setMeds] = useState<MedicationItem[]>([
    {
      id: '1',
      name: 'Sertraline / Prescription',
      dose: '50mg',
      time: '08:00 AM',
      frequency: 'Daily morning with breakfast',
      taken: true,
    },
    {
      id: '2',
      name: 'Vitamin D3 & Omega-3',
      dose: '1000 IU',
      time: '01:00 PM',
      frequency: 'Daily with lunch',
      taken: false,
    },
    {
      id: '3',
      name: 'Magnesium Glycinate',
      dose: '200mg',
      time: '09:30 PM',
      frequency: 'Night before sleep',
      taken: false,
    },
  ])

  const [newName, setNewName] = useState('')
  const [newDose, setNewDose] = useState('')
  const [newTime, setNewTime] = useState('08:00')

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return

    const newM: MedicationItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      dose: newDose.trim() || '1 dose',
      time: newTime,
      frequency: 'Daily',
      taken: false,
    }

    setMeds((prev) => [...prev, newM])
    setNewName('')
    setNewDose('')
  }

  const toggleTaken = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    )
  }

  const handleDelete = (id: string) => {
    setMeds((prev) => prev.filter((m) => m.id !== id))
  }

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
          {t('medsTitle')}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          {t('medsSub')}
        </p>
      </section>

      {/* Mandatory Clinical Healthcare Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-oat border border-primary-forest/10 flex items-start gap-3.5">
        <span className="material-symbols-outlined text-primary-teal text-xl mt-0.5 shrink-0">
          health_and_safety
        </span>
        <div className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          <strong className="text-text-primary font-semibold block mb-0.5">
            Clinical Health Notice
          </strong>
          {t('medDisclaimer')} Never alter dosages or discontinue medications without consulting your prescribing physician or psychiatrist.
        </div>
      </div>

      {/* Add Medication Card */}
      <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-4">
        <h2 className="font-display font-bold text-base text-text-primary">
          {t('addMedication')}
        </h2>
        <form onSubmit={handleAddMed} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t('medName')}
            className="bg-surface-oat rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:bg-surface-card border border-transparent focus:border-primary-teal/20"
          />
          <input
            type="text"
            value={newDose}
            onChange={(e) => setNewDose(e.target.value)}
            placeholder="Dose (e.g. 50mg or 1 tab)"
            className="bg-surface-oat rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:bg-surface-card border border-transparent focus:border-primary-teal/20"
          />
          <div className="flex gap-2">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="bg-surface-oat rounded-2xl px-3 py-2.5 text-xs sm:text-sm text-text-primary focus:outline-none flex-1 border border-transparent focus:border-primary-teal/20"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-primary-teal hover:bg-primary-forest text-white font-semibold text-xs transition-all active:scale-95 cursor-pointer"
            >
              {t('btnAdd')}
            </button>
          </div>
        </form>
      </div>

      {/* Medication Schedule List */}
      <div className="flex flex-col gap-3">
        <h2 className="font-display font-bold text-base text-text-primary px-1">
          Today's Schedule
        </h2>
        {meds.map((med) => (
          <div
            key={med.id}
            className={`p-4 sm:p-5 rounded-2xl border border-primary-forest/5 flex items-center justify-between transition-all select-none ${
              med.taken
                ? 'bg-secondary-container/40 text-text-secondary'
                : 'bg-surface-card text-text-primary'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => toggleTaken(med.id)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  med.taken
                    ? 'bg-primary-teal text-white'
                    : 'border-2 border-text-muted/40 bg-surface-card'
                }`}
              >
                {med.taken && <span className="material-symbols-outlined text-base">check</span>}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${med.taken ? 'line-through opacity-80' : ''}`}>
                    {med.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-surface-oat text-text-secondary text-[11px]">
                    {med.dose}
                  </span>
                </div>
                <div className="text-xs text-text-muted mt-0.5 flex items-center gap-2">
                  <span>{med.time}</span>
                  <span>•</span>
                  <span>{med.frequency}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDelete(med.id)}
              className="p-1 text-text-muted hover:text-emergency transition-colors cursor-pointer"
              title="Remove reminder"
            >
              <span className="material-symbols-outlined text-base">delete_outline</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
