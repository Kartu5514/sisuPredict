/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamStats {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  rating: number; // Overall base rating (60-90)
  formRating: number; // Current form (1-10)
  goals: number;
  assists: number;
  isInjured: boolean;
  isSuspended: boolean;
  roleDescription: string; // e.g., "Top Scorer", "Key Playmaker", "Captain"
}

export type PitchType = 'Artificial Turf' | 'Natural Grass';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  stadium: string;
  capacity: number;
  pitchType: PitchType;
  homeAdvantageFactor: number; // e.g., 1.2x performance boost at home
  logoColor: string; // Tailwind color class or hex
  borderColor: string;
  stats: TeamStats;
  players: Player[];
  tacticalStyle: string; // e.g., "High Pressing", "Counter Attack", "Possession-Based"
}

export type WeatherCondition = 'Ideal' | 'Rainy' | 'Freezing Cold' | 'Heavy Wind';

export interface H2HElement {
  date: string;
  homeScore: number;
  awayScore: number;
  competition: string;
}

export interface H2HHistory {
  played: number;
  homeWins: number;
  awayWins: number;
  draws: number;
  homeGoals: number;
  awayGoals: number;
  recentMeetings: H2HElement[];
}

export interface MatchSettings {
  homeTeamId: string;
  awayTeamId: string;
  weather: WeatherCondition;
  pitchType: PitchType;
  homeFormOffset: number; // -3 to +3
  awayFormOffset: number; // -3 to +3
  injuredPlayerIds: string[]; // List of players out of the match
  importanceFactor: 'Normal' | 'Title Decider' | 'Relegation Battle' | 'Cup Tie';
}

export interface PredictionResult {
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  expectedHomeGoals: number;
  expectedAwayGoals: number;
  over25Prob: number;
  bttsProb: number; // Both Teams to Score probability
  predictedScore: string;
  confidenceScore: number; // 0 - 100
  aiAnalysis: {
    tacticalMatchup: string;
    keyPlayerImpact: string;
    bettingValueAnalysis: string;
    suggestedTips: Array<{
      type: string; // "1X2", "Over/Under", "BTTS", "Handicap"
      bet: string; // "HJK Win", "Over 2.5 Goals", etc.
      oddsSimulated: number; // e.g., 1.85
      confidence: 'High' | 'Medium' | 'Low';
      justification: string;
    }>;
  };
}
