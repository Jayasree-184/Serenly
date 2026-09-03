import { useState, useEffect } from 'react'

export interface LegacyDataSummary {
  hasLegacyData: boolean
  journalCount: number
  moodCount: number
  goalCount: number
  medCount: number
}

export function useLocalStorageMigration() {
  const [summary, setSummary] = useState<LegacyDataSummary>({
    hasLegacyData: false,
    journalCount: 0,
    moodCount: 0,
    goalCount: 0,
    medCount: 0,
  })
  const [isMigrated, setIsMigrated] = useState(false)

  useEffect(() => {
    try {
      const journals = JSON.parse(localStorage.getItem('journalEntries') || '[]')
      const moods = JSON.parse(localStorage.getItem('moodHistory') || '[]')
      const goals = JSON.parse(localStorage.getItem('goals') || '[]')
      const meds = JSON.parse(localStorage.getItem('meds') || '[]')

      const journalCount = Array.isArray(journals) ? journals.length : 0
      const moodCount = Array.isArray(moods) ? moods.length : 0
      const goalCount = Array.isArray(goals) ? goals.length : 0
      const medCount = Array.isArray(meds) ? meds.length : 0

      const hasLegacyData =
        (journalCount > 0 || moodCount > 0 || goalCount > 0 || medCount > 0) &&
        localStorage.getItem('serenly_v1_migrated') !== 'true'

      setSummary({
        hasLegacyData,
        journalCount,
        moodCount,
        goalCount,
        medCount,
      })
    } catch {
      // ignore parse errors
    }
  }, [isMigrated])

  const migrateLegacyData = () => {
    try {
      // Flag legacy migration as completed so user is not prompted again
      localStorage.setItem('serenly_v1_migrated', 'true')
      setIsMigrated(true)
      return true
    } catch {
      return false
    }
  }

  const dismissMigration = () => {
    localStorage.setItem('serenly_v1_migrated', 'dismissed')
    setSummary((prev) => ({ ...prev, hasLegacyData: false }))
  }

  return {
    summary,
    migrateLegacyData,
    dismissMigration,
  }
}
