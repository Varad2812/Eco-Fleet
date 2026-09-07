import React from 'react';
import { FleetProvider, useFleet } from './context/FleetContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DemoTourBanner } from './components/DemoTourBanner';
import { StormSimulator } from './components/StormSimulator';
import { OptimizationModal } from './components/OptimizationModal';
import { ReoptimizationModal } from './components/ReoptimizationModal';

import { CommandCenter } from './pages/CommandCenter';
import { VoyageOptimizer } from './pages/VoyageOptimizer';
import { FleetPage } from './pages/FleetPage';
import { WeatherPage } from './pages/WeatherPage';
import { ReoptimizationPage } from './pages/ReoptimizationPage';
import { CIIPage } from './pages/CIIPage';
import { BenchmarkPage } from './pages/BenchmarkPage';
import { SettingsPage } from './pages/SettingsPage';

import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const AppContent = () => {
  const { activePage, toast } = useFleet();

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Operational Viewport */}
      <div className="main-viewport">
        {/* Top Header */}
        <Header />

        {/* Walkthrough Banner (active during Executive Walkthrough Mode) */}
        <DemoTourBanner />

        {/* Dynamic Page Router Content */}
        <main className="content-scrollable">
          {activePage === 'command-center' && <CommandCenter />}
          {activePage === 'voyage-optimizer' && <VoyageOptimizer />}
          {activePage === 'fleet' && <FleetPage />}
          {activePage === 'weather' && <WeatherPage />}
          {activePage === 'reoptimization' && <ReoptimizationPage />}
          {activePage === 'cii' && <CIIPage />}
          {activePage === 'benchmark' && <BenchmarkPage />}
          {activePage === 'settings' && <SettingsPage />}
        </main>

        {/* Global Modals */}
        <StormSimulator />
        <OptimizationModal />
        <ReoptimizationModal />

        {/* Toast Notification Container */}
        {toast && (
          <div className="toast-container">
            <div className={`toast ${toast.type}`}>
              {toast.type === 'success' ? (
                <CheckCircle2 size={16} color="var(--accent-green)" />
              ) : toast.type === 'danger' ? (
                <AlertCircle size={16} color="var(--accent-red)" />
              ) : toast.type === 'warning' ? (
                <AlertTriangle size={16} color="var(--accent-amber)" />
              ) : (
                <Info size={16} color="var(--accent-cyan)" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <FleetProvider>
      <AppContent />
    </FleetProvider>
  );
}
