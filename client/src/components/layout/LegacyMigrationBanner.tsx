import React from 'react'
import { useLocalStorageMigration } from '../../hooks/useLocalStorageMigration'

export const LegacyMigrationBanner: React.FC = () => {
  const { summary, migrateLegacyData, dismissMigration } = useLocalStorageMigration()

  if (!summary.hasLegacyData) return null

  const items = []
  if (summary.journalCount > 0) items.push(`${summary.journalCount} journals`)
  if (summary.moodCount > 0) items.push(`${summary.moodCount} mood check-ins`)
  if (summary.goalCount > 0) items.push(`${summary.goalCount} goals`)
  if (summary.medCount > 0) items.push(`${summary.medCount} medication records`)

  return (
    <div className="mb-6 p-4 md:p-5 rounded-2xl bg-container-sage/60 border border-primary-teal/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-surface-card flex items-center justify-center text-primary-teal shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-lg">history_edu</span>
        </div>
        <div>
          <h4 className="font-semibold text-text-primary text-sm">
            Previous Serenly Data Found
          </h4>
          <p className="text-xs text-text-secondary mt-0.5">
            We discovered {items.join(', ')} from your previous visits. Would you like to import them into your Sanctuary?
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          type="button"
          onClick={dismissMigration}
          className="px-3 py-1.5 rounded-xl text-xs text-text-secondary hover:bg-surface-card/60 transition-colors"
        >
          Not now
        </button>
        <button
          type="button"
          onClick={migrateLegacyData}
          className="px-4 py-1.5 rounded-xl bg-primary-teal text-white font-medium text-xs hover:bg-primary-forest transition-all shadow-xs"
        >
          Import data safely
        </button>
      </div>
    </div>
  )
}
