/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Team } from '../types';
import { getH2HHistory } from '../data/veikkausliigaData';
import { Calendar, Compass, Shield, ArrowRightLeft, Percent, Goal } from 'lucide-react';

interface H2HCompareTabProps {
  teams: Team[];
}

export default function H2HCompareTab({ teams }: H2HCompareTabProps) {
  const [teamAId, setTeamAId] = useState<string>('hjk');
  const [teamBId, setTeamBId] = useState<string>('kups');

  const teamA = teams.find(t => t.id === teamAId)!;
  const teamB = teams.find(t => t.id === teamBId)!;

  // Make sure teamA and teamB are never the same
  const handleSelectA = (id: string) => {
    setTeamAId(id);
    if (id === teamBId) {
      const nextAvailable = teams.find(t => t.id !== id);
      if (nextAvailable) setTeamBId(nextAvailable.id);
    }
  };

  const handleSelectB = (id: string) => {
    setTeamBId(id);
    if (id === teamAId) {
      const nextAvailable = teams.find(t => t.id !== id);
      if (nextAvailable) setTeamAId(nextAvailable.id);
    }
  };

  const h2h = getH2HHistory(teamAId, teamBId);

  // Compute percentages
  const winAPercent = h2h.played > 0 ? Math.round((h2h.homeWins / h2h.played) * 100) : 0;
  const winBPercent = h2h.played > 0 ? Math.round((h2h.awayWins / h2h.played) * 100) : 0;
  const drawPercent = h2h.played > 0 ? Math.round((h2h.draws / h2h.played) * 100) : 0;

  return (
    <div id="h2h-compare-tab-root" className="space-y-6">
      {/* Selector Area */}
      <div className="bg-slate-900/50 border border-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
          Komparasi Head-to-Head (H2H)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Team A */}
          <div className="md:col-span-4 space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Tim Pertama</label>
            <div className="flex items-center gap-3 bg-slate-950/60 border border-white/10 p-2 rounded-lg">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${teamA.logoColor} flex-shrink-0`} />
              <select
                id="select-h2h-a"
                value={teamAId}
                onChange={(e) => handleSelectA(e.target.value)}
                className="w-full bg-transparent text-white outline-none text-sm cursor-pointer"
              >
                {teams.map(t => (
                  <option key={t.id} value={t.id} className="bg-slate-950">{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* VS Divider */}
          <div className="md:col-span-3 text-center flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-cyan-400/20 shadow-[0_0_12px_rgba(0,242,255,0.1)] flex items-center justify-center text-xs font-black text-cyan-400">
              VS
            </div>
          </div>

          {/* Team B */}
          <div className="md:col-span-4 space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Tim Kedua</label>
            <div className="flex items-center gap-3 bg-slate-950/60 border border-white/10 p-2 rounded-lg">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${teamB.logoColor} flex-shrink-0`} />
              <select
                id="select-h2h-b"
                value={teamBId}
                onChange={(e) => handleSelectB(e.target.value)}
                className="w-full bg-transparent text-white outline-none text-sm cursor-pointer"
              >
                {teams.map(t => (
                  <option key={t.id} value={t.id} disabled={t.id === teamAId} className="bg-slate-950">{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Comparison Charts and standing compare */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/50 border border-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Percent className="w-4 h-4 text-cyan-400" />
              Rasio Kemenangan H2H
            </h3>

            <div className="space-y-4 text-xs">
              {/* Wins A */}
              <div className="space-y-1">
                <div className="flex justify-between text-white font-medium">
                  <span>Kemenangan {teamA.shortName}</span>
                  <span className="font-mono text-cyan-400">{h2h.homeWins} Laga ({winAPercent}%)</span>
                </div>
                <div className="w-full bg-slate-950/60 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#00f2ff]" style={{ width: `${winAPercent}%` }} />
                </div>
              </div>

              {/* Draws */}
              <div className="space-y-1">
                <div className="flex justify-between text-white font-medium">
                  <span>Hasil Seri</span>
                  <span className="font-mono text-slate-400">{h2h.draws} Laga ({drawPercent}%)</span>
                </div>
                <div className="w-full bg-slate-950/60 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-slate-700 h-full rounded-full transition-all duration-500" style={{ width: `${drawPercent}%` }} />
                </div>
              </div>

              {/* Wins B */}
              <div className="space-y-1">
                <div className="flex justify-between text-white font-medium">
                  <span>Kemenangan {teamB.shortName}</span>
                  <span className="font-mono text-amber-400">{h2h.awayWins} Laga ({winBPercent}%)</span>
                </div>
                <div className="w-full bg-slate-950/60 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500" style={{ width: `${winBPercent}%` }} />
                </div>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Goal ratio stats */}
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Goal className="w-4 h-4 text-cyan-400" />
              Perbandingan Gol H2H
            </h3>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-950/40 p-4 border border-white/5 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">{teamA.shortName} Goals</span>
                <div className="text-3xl font-extrabold text-cyan-400 font-mono">{h2h.homeGoals}</div>
                <span className="text-[10px] text-slate-400 block">Rata-rata: {(h2h.homeGoals / h2h.played).toFixed(1)} / Laga</span>
              </div>

              <div className="bg-slate-950/40 p-4 border border-white/5 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">{teamB.shortName} Goals</span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono">{h2h.awayGoals}</div>
                <span className="text-[10px] text-slate-400 block">Rata-rata: {(h2h.awayGoals / h2h.played).toFixed(1)} / Laga</span>
              </div>
            </div>
          </div>

          {/* Standings comparison list */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-xl space-y-4 backdrop-blur-sm">
            <h3 className="text-base font-bold text-white">Komparasi Klasemen Liga</h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-3 text-center border-b border-white/5 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>{teamA.shortName}</span>
                <span className="text-slate-400 font-sans">Metrik</span>
                <span>{teamB.shortName}</span>
              </div>

              {/* Poin */}
              <div className="grid grid-cols-3 text-center py-2 border-b border-white/5">
                <span className="font-bold text-white text-sm">{teamA.stats.points}</span>
                <span className="text-cyan-400 font-sans font-medium text-[11px] uppercase tracking-wide">Poin Saat Ini</span>
                <span className="font-bold text-white text-sm">{teamB.stats.points}</span>
              </div>

              {/* Wins */}
              <div className="grid grid-cols-3 text-center py-2 border-b border-white/5">
                <span className="text-green-400 font-bold">{teamA.stats.wins}</span>
                <span className="text-slate-400 font-sans font-medium text-[11px] uppercase tracking-wide">Kemenangan</span>
                <span className="text-green-400 font-bold">{teamB.stats.wins}</span>
              </div>

              {/* Goals For */}
              <div className="grid grid-cols-3 text-center py-2 border-b border-white/5">
                <span className="text-white">{teamA.stats.goalsFor}</span>
                <span className="text-slate-400 font-sans font-medium text-[11px] uppercase tracking-wide">Gol Memasukkan</span>
                <span className="text-white">{teamB.stats.goalsFor}</span>
              </div>

              {/* Goals Against */}
              <div className="grid grid-cols-3 text-center py-2">
                <span className="text-red-400">{teamA.stats.goalsAgainst}</span>
                <span className="text-slate-400 font-sans font-medium text-[11px] uppercase tracking-wide">Gol Kemasukan</span>
                <span className="text-red-400">{teamB.stats.goalsAgainst}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Meeting History list */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-xl space-y-4 backdrop-blur-sm">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            Riwayat Pertemuan Terkini (5 Pertandingan Terakhir)
          </h3>

          <div className="space-y-3">
            {h2h.recentMeetings.map((meeting, idx) => {
              const homeWon = meeting.homeScore > meeting.awayScore;
              const awayWon = meeting.awayScore > meeting.homeScore;

              return (
                <div key={idx} className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-center justify-between text-sm hover:border-cyan-400/20 transition-all">
                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">{meeting.competition}</span>
                    <span className="text-xs text-slate-400">{meeting.date}</span>
                  </div>

                  {/* Match Scores */}
                  <div className="flex items-center gap-6">
                    {/* Home Side */}
                    <div className="text-right w-24">
                      <span className={`font-semibold text-xs block ${homeWon ? 'text-white' : 'text-slate-400'}`}>
                        {teamA.shortName}
                      </span>
                      <span className="text-[10px] text-slate-500">Home</span>
                    </div>

                    {/* Scores badge */}
                    <div className="bg-slate-950/80 border border-white/10 rounded-lg px-3.5 py-1.5 font-bold font-mono text-cyan-400 text-base min-w-[70px] text-center shadow-[0_0_8px_rgba(0,242,255,0.05)]">
                      {meeting.homeScore} - {meeting.awayScore}
                    </div>

                    {/* Away Side */}
                    <div className="text-left w-24">
                      <span className={`font-semibold text-xs block ${awayWon ? 'text-white' : 'text-slate-400'}`}>
                        {teamB.shortName}
                      </span>
                      <span className="text-[10px] text-slate-500">Away</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950/40 p-4 border border-white/5 rounded-xl space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Sains Analisis Sejarah
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Secara historis, pertarungan antara **{teamA.name}** dan **{teamB.name}** didominasi oleh tim yang memiliki keuntungan sebagai tuan rumah. Di Veikkausliiga, aklimatisasi permukaan sintetis merupakan keunggulan mutlak yang membuat laga tandang di Bolt Arena atau Väre Areena sangat menantang bagi klub pantai seperti IFK Mariehamn atau FC Inter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
