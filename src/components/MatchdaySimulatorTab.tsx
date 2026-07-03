/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Team } from '../types';
import { Play, RotateCcw, Trophy, CheckCircle, Zap, Shield } from 'lucide-react';

interface MatchdaySimulatorTabProps {
  teams: Team[];
}

interface SimulatedMatch {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  isSimulated: boolean;
  scorers?: string[];
}

export default function MatchdaySimulatorTab({ teams }: MatchdaySimulatorTabProps) {
  // Preset fixtures for the matchday (6 matches)
  const defaultFixtures = [
    { id: 1, homeId: 'hjk', awayId: 'kups' },
    { id: 2, homeId: 'sjk', awayId: 'ilves' },
    { id: 3, homeId: 'vps', awayId: 'haka' },
    { id: 4, homeId: 'inter', awayId: 'gnistan' },
    { id: 5, homeId: 'oulu', awayId: 'mariehamn' },
    { id: 6, homeId: 'lahti', awayId: 'eif' }
  ];

  const [fixtures, setFixtures] = useState<SimulatedMatch[]>(() => 
    defaultFixtures.map(f => ({
      id: f.id,
      homeTeam: teams.find(t => t.id === f.homeId)!,
      awayTeam: teams.find(t => t.id === f.awayId)!,
      isSimulated: false
    }))
  );

  const [simulatedStandings, setSimulatedStandings] = useState<Team[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulateAll = () => {
    setIsSimulating(true);

    setTimeout(() => {
      // Create clone of teams to modify stats
      const teamsClone = teams.map(t => ({
        ...t,
        stats: { ...t.stats }
      }));

      const updatedFixtures = fixtures.map(fixture => {
        const homePower = fixture.homeTeam.stats.points + (fixture.homeTeam.stats.goalsFor - fixture.homeTeam.stats.goalsAgainst) / 3;
        const awayPower = fixture.awayTeam.stats.points + (fixture.awayTeam.stats.goalsFor - fixture.awayTeam.stats.goalsAgainst) / 3;

        // Base expectations with home advantage
        const hExp = (homePower / 30) * 1.35;
        const aExp = (awayPower / 30) * 1.0;

        // Random goals
        const homeScore = Math.max(0, Math.round(hExp + (Math.random() * 2.2 - 1.1)));
        const awayScore = Math.max(0, Math.round(aExp + (Math.random() * 2.2 - 1.1)));

        // Update home stats clone
        const hTeam = teamsClone.find(t => t.id === fixture.homeTeam.id)!;
        const aTeam = teamsClone.find(t => t.id === fixture.awayTeam.id)!;

        hTeam.stats.played += 1;
        aTeam.stats.played += 1;
        hTeam.stats.goalsFor += homeScore;
        hTeam.stats.goalsAgainst += awayScore;
        aTeam.stats.goalsFor += awayScore;
        aTeam.stats.goalsAgainst += homeScore;

        if (homeScore > awayScore) {
          hTeam.stats.wins += 1;
          hTeam.stats.points += 3;
          aTeam.stats.losses += 1;
        } else if (awayScore > homeScore) {
          aTeam.stats.wins += 1;
          aTeam.stats.points += 3;
          hTeam.stats.losses += 1;
        } else {
          hTeam.stats.draws += 1;
          hTeam.stats.points += 1;
          aTeam.stats.draws += 1;
          aTeam.stats.points += 1;
        }

        // Generate scorers
        const scorers: string[] = [];
        // Add home scorers
        if (homeScore > 0) {
          const striker = fixture.homeTeam.players.find(p => p.position === 'FWD');
          const midfielder = fixture.homeTeam.players.find(p => p.position === 'MID');
          for (let i = 0; i < homeScore; i++) {
            if (i === 0 && striker) scorers.push(`${striker.name} (${fixture.homeTeam.shortName})`);
            else if (i === 1 && midfielder) scorers.push(`${midfielder.name} (${fixture.homeTeam.shortName})`);
            else scorers.push(`Pemain ${fixture.homeTeam.shortName} (${Math.round(Math.random() * 15 + 10)}')`);
          }
        }
        // Add away scorers
        if (awayScore > 0) {
          const striker = fixture.awayTeam.players.find(p => p.position === 'FWD');
          const midfielder = fixture.awayTeam.players.find(p => p.position === 'MID');
          for (let i = 0; i < awayScore; i++) {
            if (i === 0 && striker) scorers.push(`${striker.name} (${fixture.awayTeam.shortName})`);
            else if (i === 1 && midfielder) scorers.push(`${midfielder.name} (${fixture.awayTeam.shortName})`);
            else scorers.push(`Pemain ${fixture.awayTeam.shortName} (${Math.round(Math.random() * 15 + 10)}')`);
          }
        }

        return {
          ...fixture,
          homeScore,
          awayScore,
          isSimulated: true,
          scorers
        };
      });

      setFixtures(updatedFixtures);

      // Sort live standings
      const sorted = teamsClone.sort((a, b) => {
        if (b.stats.points !== a.stats.points) {
          return b.stats.points - a.stats.points;
        }
        const gdA = a.stats.goalsFor - a.stats.goalsAgainst;
        const gdB = b.stats.goalsFor - b.stats.goalsAgainst;
        if (gdB !== gdA) return gdB - gdA;
        return b.stats.goalsFor - a.stats.goalsFor;
      });

      setSimulatedStandings(sorted);
      setIsSimulating(false);
    }, 1500);
  };

  const handleReset = () => {
    setFixtures(
      defaultFixtures.map(f => ({
        id: f.id,
        homeTeam: teams.find(t => t.id === f.homeId)!,
        awayTeam: teams.find(t => t.id === f.awayId)!,
        isSimulated: false
      }))
    );
    setSimulatedStandings([]);
  };

  const standingsToDisplay = simulatedStandings.length > 0 ? simulatedStandings : [...teams].sort((a, b) => b.stats.points - a.stats.points);

  return (
    <div id="matchday-simulator-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT: Match fixtures list */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-slate-900/50 border border-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                Simulasi Kierros (Pekan Laga)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Simulasikan seluruh 6 pertandingan pekan ini sekaligus secara statistik.</p>
            </div>

            <div className="flex gap-2">
              {simulatedStandings.length > 0 ? (
                <button
                  id="btn-reset-simulation"
                  onClick={handleReset}
                  className="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold p-2.5 rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              ) : (
                <button
                  id="btn-run-simulation"
                  disabled={isSimulating}
                  onClick={handleSimulateAll}
                  className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold px-4 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,242,255,0.15)] transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-white fill-current" />
                  {isSimulating ? 'Simulating...' : 'Simulasikan Pekan Ini'}
                </button>
              )}
            </div>
          </div>

          {/* Fixture cards list */}
          <div className="space-y-4">
            {fixtures.map(f => (
              <div 
                key={f.id} 
                className="bg-slate-950/40 border border-white/5 rounded-xl p-4 transition-all hover:border-cyan-400/20 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div className="flex items-center gap-3 w-5/12">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.homeTeam.logoColor} flex items-center justify-center font-bold text-white text-xs flex-shrink-0`}>
                      {f.homeTeam.shortName[0]}
                    </div>
                    <span className="font-bold text-white text-sm truncate">{f.homeTeam.name}</span>
                  </div>

                  {/* Score box */}
                  <div className="w-2/12 flex items-center justify-center">
                    {f.isSimulated ? (
                      <div className="bg-slate-950 border border-white/10 px-3 py-1 rounded-lg text-cyan-400 font-mono font-black text-lg shadow-[0_0_8px_rgba(0,242,255,0.05)]">
                        {f.homeScore} - {f.awayScore}
                      </div>
                    ) : (
                      <div className="text-slate-500 font-bold text-sm tracking-wider font-mono">
                        VS
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-3 w-5/12 justify-end text-right">
                    <span className="font-bold text-white text-sm truncate">{f.awayTeam.name}</span>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.awayTeam.logoColor} flex items-center justify-center font-bold text-white text-xs flex-shrink-0`}>
                      {f.awayTeam.shortName[0]}
                    </div>
                  </div>
                </div>

                {/* Simulated Scorer info */}
                {f.isSimulated && f.scorers && f.scorers.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400">
                    <span className="font-semibold text-cyan-400 uppercase tracking-wider font-mono">Pencetak Gol:</span>
                    <span>{f.scorers.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Live standings changes */}
      <div className="lg:col-span-5 bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="p-6 bg-gradient-to-b from-slate-950/80 to-slate-900/40 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-base font-bold text-white flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-cyan-400" />
            {simulatedStandings.length > 0 ? 'Live Standings (Hasil Simulasi)' : 'Standings Awal Pekan'}
          </h2>
          {simulatedStandings.length > 0 && (
            <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Live
            </span>
          )}
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-950/40">
                <th className="py-3 px-3 text-center w-8">Pos</th>
                <th className="py-3 px-3">Klub</th>
                <th className="py-3 px-3 text-center">Mn</th>
                <th className="py-3 px-3 text-center">SG</th>
                <th className="py-3 px-3 text-center">Poin</th>
              </tr>
            </thead>
            <tbody>
              {standingsToDisplay.map((team, idx) => {
                const gd = team.stats.goalsFor - team.stats.goalsAgainst;
                return (
                  <tr 
                    key={team.id}
                    className="border-b border-white/5 hover:bg-slate-850/10 transition-all"
                  >
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${team.logoColor}`} />
                      <span className="truncate max-w-[120px]">{team.shortName}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-400">{team.stats.played}</td>
                    <td className={`py-2.5 px-3 text-center font-bold font-mono ${gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                      {gd > 0 ? `+${gd}` : gd}
                    </td>
                    <td className="py-2.5 px-3 text-center font-extrabold text-cyan-400 font-mono text-sm">{team.stats.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
