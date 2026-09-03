import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18n'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { MoodPage } from './pages/MoodPage'
import { CopingPage } from './pages/CopingPage'
import { JournalPage } from './pages/JournalPage'
import { GoalsPage } from './pages/GoalsPage'
import { MedicationPage } from './pages/MedicationPage'
import { CommunityPage } from './pages/CommunityPage'
import { ProfessionalsPage } from './pages/ProfessionalsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { SettingsPage } from './pages/SettingsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
})

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="mood" element={<MoodPage />} />
            <Route path="coping" element={<CopingPage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="medications" element={<MedicationPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="professionals" element={<ProfessionalsPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
