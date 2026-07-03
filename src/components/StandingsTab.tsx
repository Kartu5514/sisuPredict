/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Team } from '../types';
import { Trophy, Home, Users, Settings, Circle, CheckCircle } from 'lucide-react';

interface StandingsTabProps {
  teams: Team[];
}

export default function StandingsTab({ teams }: StandingsTabProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Sort teams by Points desc, Goal Difference desc, Goals For desc
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.stats.points !== a.stats.points) {
      return b.stats.points - a.stats.points;
    }
    const gdA = a.stats.goalsFor - a.stats.goalsAgainst;
    const gdB = b.stats.goalsFor - b.stats.goalsAgainst;
    if (gdB !== gdA) {
      return gdB - gdA;
    }
    return b.stats.goalsFor - a.stats.goalsFor;
  });

  const selectedTeam = teams.find(t => t.id === selectedTeamId);

  return (
    <div id="standings-tab-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT: Standings table */}
      <div className="lg:col-span-8 bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 bg-gradient-to-b from-slate-950/80 to-slate-900/40 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-cyan-400" />
            Klasemen Resmi Veikkausliiga
          </h2>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Musim Historis Terkini</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/40">
                <th className="py-4 px-4 text-center w-12">Pos</th>
                <th className="py-4 px-4">Klub</th>
                <th className="py-4 px-4 text-center">Mn</th>
                <th className="py-4 px-4 text-center">M</th>
                <th className="py-4 px-4 text-center">S</th>
                <th className="py-4 px-4 text-center">K</th>
                <th className="py-4 px-4 text-center">Gol</th>
                <th className="py-4 px-4 text-center">SG</th>
                <th className="py-4 px-4 text-center">Poin</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, idx) => {
                const isSelected = team.id === selectedTeamId;
                const gd = team.stats.goalsFor - team.stats.goalsAgainst;
                return (
                  <tr 
                    key={team.id}
                    onClick={() => setSelectedTeamId(team.id === selectedTeamId ? null : team.id)}
                    className={`border-b border-white/5 text-sm transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-cyan-400/10 hover:bg-cyan-400/15 border-l-4 border-l-cyan-400' 
                        : 'hover:bg-slate-850/30'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${team.logoColor}`} />
                        <span>{team.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center text-slate-300">{team.stats.played}</td>
                    <td className="py-3.5 px-4 text-center text-green-400">{team.stats.wins}</td>
                    <td className="py-3.5 px-4 text-center text-slate-400">{team.stats.draws}</td>
                    <td className="py-3.5 px-4 text-center text-red-400">{team.stats.losses}</td>
                    <td className="py-3.5 px-4 text-center text-slate-400 font-mono">
                      {team.stats.goalsFor}:{team.stats.goalsAgainst}
                    </td>
                    <td className={`py-3.5 px-4 text-center font-bold font-mono ${gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                      {gd > 0 ? `+${gd}` : gd}
                    </td>
                    <td className="py-3.5 px-4 text-center font-extrabold text-cyan-400 text-base">
                      {team.stats.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950/20 text-center text-xs text-slate-500 border-t border-white/5">
          * Klik nama klub pada klasemen untuk melihat rincian skuat pilar, gaya taktis, dan stadion.
        </div>
      </div>

      {/* RIGHT: Selected Team Detail */}
      <div className="lg:col-span-4 space-y-6">
        {selectedTeam ? (
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
            {/* Header with team colors */}
            <div className="p-6 bg-slate-950/80 border-b border-white/5 relative flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedTeam.logoColor} flex items-center justify-center font-black text-white text-lg border border-white/10 shadow-lg`} />
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{selectedTeam.name}</h3>
                <p className="text-xs text-slate-400">{selectedTeam.city}, Finlandia</p>
              </div>
              <div className="absolute top-4 right-4 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold">
                {selectedTeam.shortName}
              </div>
            </div>

            {/* Profile body */}
            <div className="p-6 space-y-6">
              {/* Stadium & Surface info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-1">
                  <Home className="w-4 h-4 text-cyan-400" />
                  Stadion & Lapangan
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500">Nama Stadion:</span>
                    <p className="font-semibold text-white mt-0.5">{selectedTeam.stadium}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Kapasitas:</span>
                    <p className="font-semibold text-white mt-0.5">{selectedTeam.capacity.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Jenis Permukaan:</span>
                    <p className="font-semibold text-cyan-400 mt-0.5">{selectedTeam.pitchType}</p>
                  </div>
                </div>
              </div>

              {/* Tactical Style */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-1">
                  <Settings className="w-4 h-4 text-cyan-400" />
                  Identitas Taktik
                </h4>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 text-xs">
                  <span className="text-slate-500 font-semibold uppercase text-[9px] tracking-wider">Sistem Utama:</span>
                  <p className="text-white font-medium mt-1 leading-relaxed text-sm">
                    {selectedTeam.tacticalStyle}
                  </p>
                </div>
              </div>

              {/* Core players list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-1">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Pemain Pilar Utama
                </h4>
                <div className="space-y-2">
                  {selectedTeam.players.map(p => (
                    <div key={p.id} className="bg-slate-950/40 border border-white/5 p-2.5 rounded-xl flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.roleDescription}</span>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <span className="text-[9px] text-slate-500 block uppercase font-mono">Form</span>
                          <span className="font-bold text-green-400 font-mono text-xs">{p.formRating}/10</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono font-bold">
                          {p.position}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-white/5 border-dashed rounded-2xl p-8 shadow-xl text-center min-h-[300px] flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-slate-950 border border-white/5 rounded-full flex items-center justify-center mb-3">
              <Circle className="w-6 h-6 text-cyan-400/50 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Pilih Klub Klasemen</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Klik salah satu klub di dalam tabel klasemen untuk melihat profil analisis taktis, rincian lapangan, dan pemain kuncinya di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
