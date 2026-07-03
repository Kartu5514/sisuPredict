/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trophy, 
  ArrowRightLeft, 
  Zap, 
  TrendingUp, 
  Compass,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Team } from './types';
import { VEIKKAUSLIIGA_TEAMS } from './data/veikkausliigaData';

// Component Imports
import PredictorTab from './components/PredictorTab';
import StandingsTab from './components/StandingsTab';
import H2HCompareTab from './components/H2HCompareTab';
import MatchdaySimulatorTab from './components/MatchdaySimulatorTab';

type ActiveTab = 'predictor' | 'standings' | 'h2h' | 'simulator';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('predictor');
  const [teams, setTeams] = useState<Team[]>(VEIKKAUSLIIGA_TEAMS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch real teams from Express server
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        if (!response.ok) throw new Error('Gagal mengambil data tim dari server.');
        const data = await response.json();
        setTeams(data);
      } catch (err: any) {
        console.warn('Menggunakan data tim lokal cadangan:', err.message);
        // Fallback to offline local teams which is fully functional
        setTeams(VEIKKAUSLIIGA_TEAMS);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const tabItems = [
    { id: 'predictor', label: 'Prediktor Laga', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'standings', label: 'Klasemen Liga', icon: <Trophy className="w-4 h-4" /> },
    { id: 'h2h', label: 'Komparasi H2H', icon: <ArrowRightLeft className="w-4 h-4" /> },
    { id: 'simulator', label: 'Simulasi Pekan', icon: <Zap className="w-4 h-4" /> }
  ] as const;

  return (
    <div id="app-container" className="min-h-screen bg-immersive-bg text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      {/* HEADER SECTION */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-cyan-400/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex flex-col lg:flex-row items-center justify-between gap-4 py-4 lg:py-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="logo-icon-fi" />
              <div>
                <h1 className="text-xl font-black text-white tracking-tight">
                  SisuPredict
                </h1>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider -mt-1">Veikkausliiga Analytics v4.2</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full text-[11px] font-bold text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 breathing-glow" />
              DATA LIVE: GAME WEEK 18
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
            {tabItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`tab-nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'text-cyan-400' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/30'
                  }`}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>

                  {isActive && (
                    <motion.div 
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-cyan-400/10 rounded-lg border border-cyan-400/20 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-400/15 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400">Memuat data tim dan statistik Veikkausliiga...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'predictor' && <PredictorTab teams={teams} />}
              {activeTab === 'standings' && <StandingsTab teams={teams} />}
              {activeTab === 'h2h' && <H2HCompareTab teams={teams} />}
              {activeTab === 'simulator' && <MatchdaySimulatorTab teams={teams} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* EDUCATION BLOCK */}
      <section className="bg-slate-950/40 border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-cyan-400 mt-0.5 md:mt-0 flex-shrink-0" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Mengapa Liga Finlandia Sangat Unik?</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
                  Veikkausliiga memiliki dua faktor pengaruh eksternal yang masif: **Permukaan Lapangan** dan **Cuaca**. Lebih dari 60% tim (termasuk HJK, KuPS, dan SJK) menggunakan *Artificial Turf* (Sintetis) di stadion mereka. Perubahan drastis ke *Natural Grass* (Rumput Alami) di kota Turku atau Mariehamn seringkali menyulitkan tim pemuncak klasemen. Ditambah lagi, iklim Arktik utara yang dingin memicu rasio gol yang lebih rendah (seringkali di bawah 2.5) pada laga-laga basah atau membeku.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-slate-500">
          <p>© 2026 SisuPredict. Hak cipta dilindungi.</p>
          <p>Prediksi didasarkan pada 1.250+ data pertandingan Veikkausliiga sejak 2018</p>
        </div>
      </footer>
    </div>
  );
}
