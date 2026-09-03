import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileBottomNav } from './MobileBottomNav'
import { EmergencyModal } from '../safety/EmergencyModal'

export const AppShell: React.FC = () => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false)

  return (
    <div className="min-h-screen bg-canvas-cream text-text-primary flex flex-col font-body">
      {/* Desktop Fixed Sidebar */}
      <Sidebar onOpenEmergency={() => setIsEmergencyOpen(true)} />

      {/* Main viewport with 72-unit (18rem) left margin on desktop */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header onOpenEmergency={() => setIsEmergencyOpen(true)} />

        {/* Dynamic Route Content */}
        <main className="flex-1 px-4 sm:px-8 py-6 md:py-8 max-w-7xl mx-auto w-full pb-24 lg:pb-12">
          <Outlet context={{ openEmergency: () => setIsEmergencyOpen(true) }} />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onOpenEmergency={() => setIsEmergencyOpen(true)} />

      {/* Global Persistent Emergency Support Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  )
}
