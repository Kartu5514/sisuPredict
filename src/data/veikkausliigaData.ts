/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, H2HHistory, MatchSettings, PredictionResult, H2HElement } from '../types';

export const VEIKKAUSLIIGA_TEAMS: Team[] = [
  {
    id: 'hjk',
    name: 'HJK Helsinki',
    shortName: 'HJK',
    city: 'Helsinki',
    stadium: 'Bolt Arena',
    capacity: 10770,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.25,
    logoColor: 'from-blue-600 to-blue-800',
    borderColor: 'border-blue-500',
    tacticalStyle: 'Dominasi Penguasaan Bola (Possession Dominance)',
    stats: {
      played: 27,
      wins: 16,
      draws: 6,
      losses: 5,
      goalsFor: 48,
      goalsAgainst: 25,
      points: 54,
    },
    players: [
      { id: 'hjk-gk', name: 'Niki Mäenpää', position: 'GK', rating: 76, formRating: 8, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Veteran & Pemimpin Pertahanan' },
      { id: 'hjk-def', name: 'Joona Toivio', position: 'DEF', rating: 75, formRating: 7, goals: 1, assists: 1, isInjured: false, isSuspended: false, roleDescription: 'Bek Tengah Berpengalaman Internasional' },
      { id: 'hjk-mid', name: 'Lucas Lingman', position: 'MID', rating: 78, formRating: 9, goals: 4, assists: 10, isInjured: false, isSuspended: false, roleDescription: 'Playmaker Kreatif & Dirigen Lini Tengah' },
      { id: 'hjk-fwd', name: 'Luke Plange', position: 'FWD', rating: 77, formRating: 8, goals: 12, assists: 3, isInjured: false, isSuspended: false, roleDescription: 'Striker Tajam & Target Man Utama' }
    ]
  },
  {
    id: 'kups',
    name: 'KuPS Kuopio',
    shortName: 'KuPS',
    city: 'Kuopio',
    stadium: 'Väre Areena',
    capacity: 5000,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.30,
    logoColor: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-400',
    tacticalStyle: 'Transisi Cepat & Pressing Tinggi (Gegenpressing)',
    stats: {
      played: 27,
      wins: 17,
      draws: 5,
      losses: 5,
      goalsFor: 46,
      goalsAgainst: 22,
      points: 56,
    },
    players: [
      { id: 'kups-gk', name: 'Johannes Kreidl', position: 'GK', rating: 77, formRating: 9, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Terbaik Liga, Refleks Luar Biasa' },
      { id: 'kups-def', name: 'Ibrahim Cissé', position: 'DEF', rating: 74, formRating: 8, goals: 2, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Bek Tangguh, Ahli Duel Udara' },
      { id: 'kups-mid', name: 'Matias Siltanen', position: 'MID', rating: 73, formRating: 8, goals: 3, assists: 6, isInjured: false, isSuspended: false, roleDescription: 'Talenta Muda Berbakat Box-to-Box' },
      { id: 'kups-fwd', name: 'Jonathan Muzinga', position: 'FWD', rating: 72, formRating: 7, goals: 9, assists: 2, isInjured: false, isSuspended: false, roleDescription: 'Striker Cepat, Pembuka Ruang' }
    ]
  },
  {
    id: 'sjk',
    name: 'SJK Seinäjoki',
    shortName: 'SJK',
    city: 'Seinäjoki',
    stadium: 'OmaSP Stadion',
    capacity: 6000,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.20,
    logoColor: 'from-amber-800 to-stone-900',
    borderColor: 'border-amber-700',
    tacticalStyle: 'Serangan Sayap Kreatif & Overload',
    stats: {
      played: 27,
      wins: 14,
      draws: 7,
      losses: 6,
      goalsFor: 51,
      goalsAgainst: 33,
      points: 49,
    },
    players: [
      { id: 'sjk-gk', name: 'Roope Paunio', position: 'GK', rating: 72, formRating: 7, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Utama Muda Berpotensi' },
      { id: 'sjk-def', name: 'Kelvin Pires', position: 'DEF', rating: 72, formRating: 8, goals: 1, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Menara Pertahanan Bertubuh Jangkung' },
      { id: 'sjk-mid', name: 'Pyry Hannola', position: 'MID', rating: 75, formRating: 8, goals: 5, assists: 8, isInjured: false, isSuspended: false, roleDescription: 'Metronom Serangan Tengah' },
      { id: 'sjk-fwd', name: 'Jaime Moreno', position: 'FWD', rating: 76, formRating: 9, goals: 15, assists: 4, isInjured: false, isSuspended: false, roleDescription: 'Top Scorer Klub, Penyelesai Peluang Ulung' }
    ]
  },
  {
    id: 'ilves',
    name: 'Ilves Tampere',
    shortName: 'Ilves',
    city: 'Tampere',
    stadium: 'Tammelan Stadion',
    capacity: 8000,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.22,
    logoColor: 'from-emerald-600 to-green-700',
    borderColor: 'border-green-500',
    tacticalStyle: 'Permainan Kombinasi Cepat & Vertikal',
    stats: {
      played: 27,
      wins: 15,
      draws: 6,
      losses: 6,
      goalsFor: 53,
      goalsAgainst: 30,
      points: 51,
    },
    players: [
      { id: 'ilves-gk', name: 'Otso Virtanen', position: 'GK', rating: 73, formRating: 8, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Tangguh Berpostur Kokoh' },
      { id: 'ilves-def', name: 'Juhani Pikkarainen', position: 'DEF', rating: 72, formRating: 7, goals: 2, assists: 1, isInjured: false, isSuspended: false, roleDescription: 'Bek Tangguh yang Disiplin' },
      { id: 'ilves-mid', name: 'Doni Arifi', position: 'MID', rating: 74, formRating: 8, goals: 3, assists: 7, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Jangkar Penghubung Lini' },
      { id: 'ilves-fwd', name: 'Santeri Haarala', position: 'FWD', rating: 76, formRating: 9, goals: 13, assists: 6, isInjured: false, isSuspended: false, roleDescription: 'Penyerang Sayap Sangat Lincah' }
    ]
  },
  {
    id: 'vps',
    name: 'VPS Vaasa',
    shortName: 'VPS',
    city: 'Vaasa',
    stadium: 'Lemonsoft Stadion',
    capacity: 6005,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.18,
    logoColor: 'from-neutral-700 to-neutral-950',
    borderColor: 'border-white/40',
    tacticalStyle: 'Serangan Balik Kilat (Direct Counter)',
    stats: {
      played: 27,
      wins: 12,
      draws: 5,
      losses: 10,
      goalsFor: 42,
      goalsAgainst: 38,
      points: 41,
    },
    players: [
      { id: 'vps-gk', name: 'Teppo Marttinen', position: 'GK', rating: 71, formRating: 7, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Solid dalam Antisipasi Bola Silang' },
      { id: 'vps-def', name: 'Mikko Pitkänen', position: 'DEF', rating: 70, formRating: 7, goals: 1, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Stopper Kuat Bermain Fisik' },
      { id: 'vps-mid', name: 'Evgeny Bashkirov', position: 'MID', rating: 74, formRating: 8, goals: 4, assists: 5, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Berpengalaman Eropa' },
      { id: 'vps-fwd', name: 'Mads Borchers', position: 'FWD', rating: 73, formRating: 8, goals: 10, assists: 2, isInjured: false, isSuspended: false, roleDescription: 'Striker Denmark Insting Gol Tajam' }
    ]
  },
  {
    id: 'haka',
    name: 'FC Haka Valkeakoski',
    shortName: 'FC Haka',
    city: 'Valkeakoski',
    stadium: 'Tehtaan Kenttä',
    capacity: 3516,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.25,
    logoColor: 'from-slate-800 to-slate-900',
    borderColor: 'border-slate-700',
    tacticalStyle: 'Transisi Blok Menengah & Sayap Cepat',
    stats: {
      played: 27,
      wins: 11,
      draws: 5,
      losses: 11,
      goalsFor: 37,
      goalsAgainst: 39,
      points: 38,
    },
    players: [
      { id: 'haka-gk', name: 'Anton Lepola', position: 'GK', rating: 71, formRating: 7, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Penyelamat Penalti Handal' },
      { id: 'haka-def', name: 'Nikolas Talo', position: 'DEF', rating: 70, formRating: 7, goals: 0, assists: 1, isInjured: false, isSuspended: false, roleDescription: 'Bek Kiri Modern Pembantu Serangan' },
      { id: 'haka-mid', name: 'Maissa Fall', position: 'MID', rating: 73, formRating: 8, goals: 6, assists: 4, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Fisik Kuat Pembobol Lini' },
      { id: 'haka-fwd', name: 'Oliver Whyte', position: 'FWD', rating: 72, formRating: 7, goals: 8, assists: 3, isInjured: false, isSuspended: false, roleDescription: 'Penyerang Selandia Baru yang Cerdik' }
    ]
  },
  {
    id: 'inter',
    name: 'FC Inter Turku',
    shortName: 'FC Inter',
    city: 'Turku',
    stadium: 'Veritas Stadion',
    capacity: 9372,
    pitchType: 'Natural Grass',
    homeAdvantageFactor: 1.15,
    logoColor: 'from-red-600 to-blue-700',
    borderColor: 'border-blue-500',
    tacticalStyle: 'Penguasaan Bola Pendek & Formasi Cair',
    stats: {
      played: 27,
      wins: 10,
      draws: 6,
      losses: 11,
      goalsFor: 40,
      goalsAgainst: 37,
      points: 36,
    },
    players: [
      { id: 'inter-gk', name: 'Eetu Huuhtanen', position: 'GK', rating: 72, formRating: 8, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Penjaga Gawang Muda Refleks Kilat' },
      { id: 'inter-def', name: 'Albin Granlund', position: 'DEF', rating: 71, formRating: 7, goals: 1, assists: 3, isInjured: false, isSuspended: false, roleDescription: 'Bek Sayap Veteran Timnas Finlandia' },
      { id: 'inter-mid', name: 'Florian Krebs', position: 'MID', rating: 73, formRating: 8, goals: 3, assists: 6, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Jerman Pengatur Tempo' },
      { id: 'inter-fwd', name: 'Darren Smith', position: 'FWD', rating: 74, formRating: 8, goals: 11, assists: 2, isInjured: false, isSuspended: false, roleDescription: 'Striker Afrika Selatan, Insting Predator' }
    ]
  },
  {
    id: 'gnistan',
    name: 'IF Gnistan',
    shortName: 'Gnistan',
    city: 'Helsinki',
    stadium: 'Mustapekka Areena',
    capacity: 2200,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.20,
    logoColor: 'from-yellow-400 to-yellow-600',
    borderColor: 'border-yellow-300',
    tacticalStyle: 'Fokus Pertahanan Rapat & Counter Serangan',
    stats: {
      played: 27,
      wins: 9,
      draws: 7,
      losses: 11,
      goalsFor: 35,
      goalsAgainst: 43,
      points: 34,
    },
    players: [
      { id: 'gnistan-gk', name: 'Jiri Koski', position: 'GK', rating: 69, formRating: 7, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Tangguh Penjaga Gawang Gnistan' },
      { id: 'gnistan-def', name: 'Jukka Raitala', position: 'DEF', rating: 73, formRating: 8, goals: 0, assists: 2, isInjured: false, isSuspended: false, roleDescription: 'Legenda Finlandia, Mantan Pemain MLS' },
      { id: 'gnistan-mid', name: 'Roman Eremenko', position: 'MID', rating: 74, formRating: 8, goals: 4, assists: 7, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Kelas Dunia Berteknik Tinggi' },
      { id: 'gnistan-fwd', name: 'Jonas Enkerud', position: 'FWD', rating: 70, formRating: 6, goals: 7, assists: 1, isInjured: false, isSuspended: false, roleDescription: 'Striker Fisik Kuat dari Norwegia' }
    ]
  },
  {
    id: 'oulu',
    name: 'AC Oulu',
    shortName: 'AC Oulu',
    city: 'Oulu',
    stadium: 'Raatin Stadion',
    capacity: 4392,
    pitchType: 'Natural Grass',
    homeAdvantageFactor: 1.15,
    logoColor: 'from-sky-700 to-sky-900',
    borderColor: 'border-sky-500',
    tacticalStyle: 'Serangan Cepat Sektor Sayap & Umpan Silang',
    stats: {
      played: 27,
      wins: 8,
      draws: 8,
      losses: 11,
      goalsFor: 34,
      goalsAgainst: 41,
      points: 32,
    },
    players: [
      { id: 'oulu-gk', name: 'Calum Ward', position: 'GK', rating: 72, formRating: 8, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Inggris Jebolan Akademi Bournemouth' },
      { id: 'oulu-def', name: 'Liiban Abadid', position: 'DEF', rating: 68, formRating: 6, goals: 0, assists: 1, isInjured: false, isSuspended: false, roleDescription: 'Bek Muda Berbakat & Cepat' },
      { id: 'oulu-mid', name: 'Jake Dunwoody', position: 'MID', rating: 71, formRating: 7, goals: 2, assists: 4, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Bertarung dari Irlandia Utara' },
      { id: 'oulu-fwd', name: 'Ashley Coffey', position: 'FWD', rating: 75, formRating: 9, goals: 12, assists: 3, isInjured: false, isSuspended: false, roleDescription: 'Striker Target Inggris Tajam & Kuat' }
    ]
  },
  {
    id: 'mariehamn',
    name: 'IFK Mariehamn',
    shortName: 'MIFK',
    city: 'Mariehamn',
    stadium: 'Wiklöf Holding Arena',
    capacity: 1635,
    pitchType: 'Natural Grass',
    homeAdvantageFactor: 1.35, // Kepulauan Åland terisolasi, perjalanan jauh buat lawan!
    logoColor: 'from-blue-400 to-emerald-500',
    borderColor: 'border-emerald-400',
    tacticalStyle: 'Defensive Low Block & Serangan Balik',
    stats: {
      played: 27,
      wins: 7,
      draws: 5,
      losses: 15,
      goalsFor: 27,
      goalsAgainst: 44,
      points: 26,
    },
    players: [
      { id: 'mifk-gk', name: 'Matias Riikonen', position: 'GK', rating: 68, formRating: 7, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Utama Muda Berpotensi Tinggi' },
      { id: 'mifk-def', name: 'Timi Lahti', position: 'DEF', rating: 70, formRating: 6, goals: 1, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Bek Veteran Pemimpin Lini Belakang' },
      { id: 'mifk-mid', name: 'Robin Sid', position: 'MID', rating: 69, formRating: 7, goals: 2, assists: 4, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Sayap Cepat Putra Daerah Åland' },
      { id: 'mifk-fwd', name: 'Adam Larsson', position: 'FWD', rating: 71, formRating: 8, goals: 8, assists: 1, isInjured: false, isSuspended: false, roleDescription: 'Striker Swedia yang Sangat Pekerja Keras' }
    ]
  },
  {
    id: 'lahti',
    name: 'FC Lahti',
    shortName: 'Lahti',
    city: 'Lahti',
    stadium: 'Lahden Stadion',
    capacity: 7465,
    pitchType: 'Natural Grass',
    homeAdvantageFactor: 1.12,
    logoColor: 'from-zinc-800 to-red-950',
    borderColor: 'border-red-600',
    tacticalStyle: 'Pressing Menengah & Serangan Sayap Militan',
    stats: {
      played: 27,
      wins: 6,
      draws: 8,
      losses: 13,
      goalsFor: 29,
      goalsAgainst: 45,
      points: 26,
    },
    players: [
      { id: 'lahti-gk', name: 'Osku Maukonen', position: 'GK', rating: 67, formRating: 7, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper Sangat Muda Berbakat Timnas Junior' },
      { id: 'lahti-def', name: 'Mikko Viitikko', position: 'DEF', rating: 69, formRating: 6, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Bek Tangguh yang Berani Berduel' },
      { id: 'lahti-mid', name: 'Samuel Pasanen', position: 'MID', rating: 68, formRating: 7, goals: 2, assists: 3, isInjured: false, isSuspended: false, roleDescription: 'Anak Legenda Petri Pasanen, Visi Bagus' },
      { id: 'lahti-fwd', name: 'Michael Lopez', position: 'FWD', rating: 70, formRating: 7, goals: 7, assists: 1, isInjured: false, isSuspended: false, roleDescription: 'Striker Argentina, Teknik & Fisik Seimbang' }
    ]
  },
  {
    id: 'eif',
    name: 'EIF Raseborg',
    shortName: 'EIF',
    city: 'Raseborg',
    stadium: 'Tammisaaren Keskuskenttä',
    capacity: 2500,
    pitchType: 'Artificial Turf',
    homeAdvantageFactor: 1.15,
    logoColor: 'from-green-800 to-neutral-900',
    borderColor: 'border-green-600',
    tacticalStyle: 'Bertahan Rapat & Umpan Jauh Direct',
    stats: {
      played: 27,
      wins: 5,
      draws: 5,
      losses: 17,
      goalsFor: 24,
      goalsAgainst: 52,
      points: 20,
    },
    players: [
      { id: 'eif-gk', name: 'Ramilson Almeida', position: 'GK', rating: 68, formRating: 7, goals: 0, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Kiper asal Brasil dengan Distribusi Bagus' },
      { id: 'eif-def', name: 'Kalle Katz', position: 'DEF', rating: 67, formRating: 6, goals: 1, assists: 0, isInjured: false, isSuspended: false, roleDescription: 'Bek Tengah Lugas Pembaca Pola Lawan' },
      { id: 'eif-mid', name: 'Simon Lindholm', position: 'MID', rating: 66, formRating: 6, goals: 1, assists: 2, isInjured: false, isSuspended: false, roleDescription: 'Gelandang Petarung Lokal' },
      { id: 'eif-fwd', name: 'Salomo Ojala', position: 'FWD', rating: 69, formRating: 7, goals: 6, assists: 2, isInjured: false, isSuspended: false, roleDescription: 'Striker Berpengalaman Liga Finlandia' }
    ]
  }
];

// Helper to calculate head-to-head records deterministically but with a bit of randomness based on seed
export function getH2HHistory(homeId: string, awayId: string): H2HHistory {
  const homeTeam = VEIKKAUSLIIGA_TEAMS.find(t => t.id === homeId);
  const awayTeam = VEIKKAUSLIIGA_TEAMS.find(t => t.id === awayId);

  if (!homeTeam || !awayTeam) {
    return { played: 0, homeWins: 0, awayWins: 0, draws: 0, homeGoals: 0, awayGoals: 0, recentMeetings: [] };
  }

  // Create a pseudo-random seed based on team IDs
  const combinedId = `${homeId}-${awayId}`;
  let seed = 0;
  for (let i = 0; i < combinedId.length; i++) {
    seed += combinedId.charCodeAt(i);
  }

  // Determine H2H based on rating ratio
  const ratingHome = homeTeam.stats.points;
  const ratingAway = awayTeam.stats.points;
  const total = ratingHome + ratingAway;

  const homeWinChance = ratingHome / total;
  const awayWinChance = ratingAway / total;

  // Let's create exactly 5 recent matches history
  const recentMeetings: H2HElement[] = [];
  const years = [2025, 2025, 2024, 2024, 2023];
  
  let hWins = 0;
  let aWins = 0;
  let draws = 0;
  let hGoals = 0;
  let aGoals = 0;

  for (let i = 0; i < 5; i++) {
    const matchSeed = (seed + i * 17) % 100;
    let homeScore = 0;
    let awayScore = 0;

    // Home team has a slight advantage in H2H
    const adjustedHomeChance = homeWinChance * 1.1;

    if (matchSeed < adjustedHomeChance * 100) {
      // Home Win
      homeScore = Math.floor(1 + ((seed + i) % 3));
      awayScore = Math.floor((seed + i * 2) % homeScore);
      hWins++;
    } else if (matchSeed > (1 - awayWinChance) * 100) {
      // Away Win
      awayScore = Math.floor(1 + ((seed + i) % 3));
      homeScore = Math.floor((seed + i * 3) % awayScore);
      aWins++;
    } else {
      // Draw
      homeScore = Math.floor((seed + i) % 3);
      awayScore = homeScore;
      draws++;
    }

    hGoals += homeScore;
    aGoals += awayScore;

    recentMeetings.push({
      date: `${years[i]}-${((seed + i * 3) % 4) + 5}-${((seed + i * 7) % 20) + 1}`,
      homeScore,
      awayScore,
      competition: i % 4 === 3 ? 'Suomen Cup' : 'Veikkausliiga'
    });
  }

  return {
    played: 5,
    homeWins: hWins,
    awayWins: aWins,
    draws,
    homeGoals: hGoals,
    awayGoals: aGoals,
    recentMeetings
  };
}

// Math model to perform instant local statistical simulation
export function simulateQuickPrediction(settings: MatchSettings): PredictionResult {
  const homeTeam = VEIKKAUSLIIGA_TEAMS.find(t => t.id === settings.homeTeamId)!;
  const awayTeam = VEIKKAUSLIIGA_TEAMS.find(t => t.id === settings.awayTeamId)!;

  // 1. Calculate Base Strengths from league points and goal difference
  const homeBasePower = (homeTeam.stats.points / 27) + (homeTeam.stats.goalsFor - homeTeam.stats.goalsAgainst) / 54;
  const awayBasePower = (awayTeam.stats.points / 27) + (awayTeam.stats.goalsFor - awayTeam.stats.goalsAgainst) / 54;

  // 2. Form Adjustments
  // Base form rating is average of player forms
  const homePlayerFormAvg = homeTeam.players.reduce((sum, p) => sum + p.formRating, 0) / homeTeam.players.length;
  const awayPlayerFormAvg = awayTeam.players.reduce((sum, p) => sum + p.formRating, 0) / awayTeam.players.length;

  const adjustedHomeForm = homePlayerFormAvg + settings.homeFormOffset;
  const adjustedAwayForm = awayPlayerFormAvg + settings.awayFormOffset;

  // 3. Injury adjustments (remove star power)
  let homeInjuryPenalty = 0;
  let awayInjuryPenalty = 0;

  settings.injuredPlayerIds.forEach(id => {
    const homePlayer = homeTeam.players.find(p => p.id === id);
    if (homePlayer) {
      // Penalize based on player rating and role
      const weight = homePlayer.position === 'FWD' ? 0.08 : homePlayer.position === 'GK' ? 0.07 : 0.05;
      homeInjuryPenalty += (homePlayer.rating / 100) * weight;
    }
    const awayPlayer = awayTeam.players.find(p => p.id === id);
    if (awayPlayer) {
      const weight = awayPlayer.position === 'FWD' ? 0.08 : awayPlayer.position === 'GK' ? 0.07 : 0.05;
      awayInjuryPenalty += (awayPlayer.rating / 100) * weight;
    }
  });

  // 4. Pitch & Home Advantage
  // Finnish teams are much better on their native surface!
  let pitchHomeModifier = 1.0;
  let pitchAwayModifier = 1.0;

  if (homeTeam.pitchType !== settings.pitchType) {
    // If the pitch is different from home team's standard stadium, they lose home advantage slightly
    pitchHomeModifier -= 0.05;
  }
  if (awayTeam.pitchType !== settings.pitchType) {
    // If away team plays on non-native surface, they get penalized
    pitchAwayModifier -= 0.08;
  }

  // 5. Weather modifiers
  let weatherGoalModifier = 1.0;
  if (settings.weather === 'Freezing Cold') {
    weatherGoalModifier = 0.85; // Low temperature = fewer goals
  } else if (settings.weather === 'Rainy') {
    weatherGoalModifier = 0.95; // Slippery, some unexpected goals but generally slower build-ups
  } else if (settings.weather === 'Heavy Wind') {
    weatherGoalModifier = 0.80; // Disrupts tactical long passing
  }

  // 6. Match Importance
  let tacticalHype = 'Pertandingan normal liga di mana kedua tim mencari 3 poin krusial.';
  if (settings.importanceFactor === 'Title Decider') {
    tacticalHype = 'Pertandingan perebutan gelar juara dengan tensi sangat tinggi, kedua tim akan bermain sangat berhati-hati!';
  } else if (settings.importanceFactor === 'Relegation Battle') {
    tacticalHype = 'Laga hidup mati zona degradasi. Tensi tinggi dan benturan fisik keras diprediksi mendominasi.';
  } else if (settings.importanceFactor === 'Cup Tie') {
    tacticalHype = 'Laga turnamen gugur (Suomen Cup). Tidak ada hasil imbang, kedua tim akan tampil lepas demi tiket lolos.';
  }

  // Assemble expected goals
  const baseHomeExpectation = 1.45;
  const baseAwayExpectation = 1.05;

  const homePowerMultiplier = (homeBasePower / 1.5) * (adjustedHomeForm / 7) * pitchHomeModifier * homeTeam.homeAdvantageFactor;
  const awayPowerMultiplier = (awayBasePower / 1.5) * (adjustedAwayForm / 7) * pitchAwayModifier;

  let expectedHomeGoals = Number((baseHomeExpectation * homePowerMultiplier * (1 - homeInjuryPenalty) * weatherGoalModifier).toFixed(2));
  let expectedAwayGoals = Number((baseAwayExpectation * awayPowerMultiplier * (1 - awayInjuryPenalty) * weatherGoalModifier).toFixed(2));

  // Minimum sanity clamp
  if (expectedHomeGoals < 0.2) expectedHomeGoals = 0.2;
  if (expectedAwayGoals < 0.2) expectedAwayGoals = 0.2;

  // Let's compute win/draw/loss probabilities using basic Poisson distribution approximation
  const totalExpected = expectedHomeGoals + expectedAwayGoals;
  const diff = expectedHomeGoals - expectedAwayGoals;

  let homeWinProb = Math.round((0.37 + (diff * 0.25)) * 100);
  let awayWinProb = Math.round((0.28 - (diff * 0.20)) * 100);
  let drawProb = 100 - homeWinProb - awayWinProb;

  // Clamps
  if (homeWinProb < 5) homeWinProb = 5;
  if (awayWinProb < 5) awayWinProb = 5;
  if (homeWinProb > 90) homeWinProb = 90;
  if (awayWinProb > 90) awayWinProb = 90;
  drawProb = 100 - homeWinProb - awayWinProb;

  // Over 2.5 Probability
  let over25Prob = Math.round((totalExpected / 3.2) * 100);
  if (over25Prob > 95) over25Prob = 95;
  if (over25Prob < 10) over25Prob = 10;

  // BTTS Probability
  let bttsProb = Math.round(((expectedHomeGoals > 0.8 ? 0.7 : 0.4) * (expectedAwayGoals > 0.8 ? 0.7 : 0.4)) * 150);
  if (bttsProb > 90) bttsProb = 90;
  if (bttsProb < 20) bttsProb = 20;

  // Score prediction
  const roundedHome = Math.round(expectedHomeGoals);
  const roundedAway = Math.round(expectedAwayGoals);
  const predictedScore = `${roundedHome}-${roundedAway}`;

  // Confidence Score calculation
  const confidenceScore = Math.min(
    95,
    Math.max(40, Math.round(75 + (adjustedHomeForm - adjustedAwayForm) * 3 - (settings.injuredPlayerIds.length * 4)))
  );

  // Generate suggested tips
  const suggestedTips: PredictionResult['aiAnalysis']['suggestedTips'] = [];

  // Tip 1: Full-time result
  if (homeWinProb > 50) {
    suggestedTips.push({
      type: '1X2',
      bet: `${homeTeam.shortName} Menang (Home Win)`,
      oddsSimulated: Number((100 / homeWinProb).toFixed(2)),
      confidence: homeWinProb > 65 ? 'High' : 'Medium',
      justification: `${homeTeam.name} memiliki performa kandang superior di stadion ${homeTeam.stadium} (${homeTeam.pitchType}).`
    });
  } else if (awayWinProb > 45) {
    suggestedTips.push({
      type: '1X2',
      bet: `${awayTeam.shortName} Menang (Away Win)`,
      oddsSimulated: Number((100 / awayWinProb).toFixed(2)),
      confidence: awayWinProb > 60 ? 'High' : 'Medium',
      justification: `${awayTeam.name} diunggulkan secara kualitas pemain dan tren kebugaran terkini dibanding tuan rumah.`
    });
  } else {
    suggestedTips.push({
      type: '1X2',
      bet: `Double Chance: ${homeTeam.shortName} atau Seri`,
      oddsSimulated: Number((100 / (homeWinProb + drawProb)).toFixed(2)),
      confidence: 'High',
      justification: 'Pertandingan diperkirakan berjalan sangat ketat, namun keunggulan kandang melindungi tuan rumah dari kekalahan.'
    });
  }

  // Tip 2: Goals
  if (over25Prob > 55) {
    suggestedTips.push({
      type: 'Over/Under',
      bet: 'Over 2.5 Goals',
      oddsSimulated: Number((100 / over25Prob).toFixed(2)),
      confidence: over25Prob > 70 ? 'High' : 'Medium',
      justification: `Kedua tim memiliki lini serang produktif. Rata-rata gol yang diharapkan adalah ${totalExpected.toFixed(1)}.`
    });
  } else {
    suggestedTips.push({
      type: 'Over/Under',
      bet: 'Under 2.5 Goals',
      oddsSimulated: Number((100 / (100 - over25Prob)).toFixed(2)),
      confidence: 'Medium',
      justification: `Cuaca ${settings.weather} dan taktik defensif diperkirakan meredam produktivitas gol kedua tim.`
    });
  }

  // Tip 3: Both Teams to Score (BTTS)
  if (bttsProb > 55) {
    suggestedTips.push({
      type: 'BTTS',
      bet: 'Kedua Tim Mencetak Gol (Yes)',
      oddsSimulated: Number((100 / bttsProb).toFixed(2)),
      confidence: bttsProb > 75 ? 'High' : 'Medium',
      justification: 'Kelemahan transisi bertahan tuan rumah dan kecepatan serangan balik lawan mendukung terjadinya gol di kedua sisi.'
    });
  }

  return {
    homeWinProb,
    drawProb,
    awayWinProb,
    expectedHomeGoals,
    expectedAwayGoals,
    over25Prob,
    bttsProb,
    predictedScore,
    confidenceScore,
    aiAnalysis: {
      tacticalMatchup: `Pertandingan antara **${homeTeam.name}** vs **${awayTeam.name}** menyajikan benturan taktis antara gaya *${homeTeam.tacticalStyle}* melawan *${awayTeam.tacticalStyle}*. Laga dimainkan di **${homeTeam.stadium}** dengan permukaan **${settings.pitchType}** dalam kondisi cuaca **${settings.weather}**. ${tacticalHype}`,
      keyPlayerImpact: `Ketiadaan ${settings.injuredPlayerIds.length} pemain kunci berdampak pada kesolidan formasi dasar. Sektor yang paling terpengaruh adalah kelancaran transisi bola di lini tengah.`,
      bettingValueAnalysis: `Analisis statistik historis menunjukkan rasio gol kandang ${homeTeam.name} yang stabil, namun tim tamu ${awayTeam.name} memiliki rekam jejak mencuri poin di laga tandang berkat taktik yang adaptif.`,
      suggestedTips
    }
  };
}
