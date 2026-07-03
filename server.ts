/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { VEIKKAUSLIIGA_TEAMS, getH2HHistory, simulateQuickPrediction } from './src/data/veikkausliigaData';
import { MatchSettings } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_API_KEY && GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini API initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Gemini Client:', error);
  }
} else {
  console.log('GEMINI_API_KEY is not configured. Running in statistical-only mode.');
}

// REST API endpoint to get list of teams
app.get('/api/teams', (req, res) => {
  res.json(VEIKKAUSLIIGA_TEAMS);
});

// REST API endpoint to get Head-to-Head statistics
app.get('/api/h2h/:homeId/:awayId', (req, res) => {
  const { homeId, awayId } = req.params;
  const h2h = getH2HHistory(homeId, awayId);
  res.json(h2h);
});

// Primary Predictive API endpoint
app.post('/api/predict', async (req, res) => {
  const settings: MatchSettings = req.body;

  if (!settings.homeTeamId || !settings.awayTeamId) {
    return res.status(400).json({ error: 'homeTeamId and awayTeamId are required.' });
  }

  // 1. Get detailed team data
  const homeTeam = VEIKKAUSLIIGA_TEAMS.find((t) => t.id === settings.homeTeamId);
  const awayTeam = VEIKKAUSLIIGA_TEAMS.find((t) => t.id === settings.awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ error: 'One or both teams not found.' });
  }

  // 2. Perform base mathematical simulation as fallback and grounding context
  const statsPrediction = simulateQuickPrediction(settings);
  const h2h = getH2HHistory(settings.homeTeamId, settings.awayTeamId);

  // If Gemini is not initialized, return the statistical model directly
  if (!ai) {
    return res.json({
      ...statsPrediction,
      isAiPowered: false,
      aiNotice: 'Analisis berbasis model statistik matematika lokal (GEMINI_API_KEY belum dikonfigurasi).',
    });
  }

  // 3. Build detailed prompt for Gemini
  const activeHomePlayers = homeTeam.players.filter((p) => !settings.injuredPlayerIds.includes(p.id));
  const injuredHomePlayers = homeTeam.players.filter((p) => settings.injuredPlayerIds.includes(p.id));

  const activeAwayPlayers = awayTeam.players.filter((p) => !settings.injuredPlayerIds.includes(p.id));
  const injuredAwayPlayers = awayTeam.players.filter((p) => settings.injuredPlayerIds.includes(p.id));

  const prompt = `
Anda adalah seorang analis taktik sepak bola profesional Eropa Utara dan ahli prediksi taruhan olahraga khusus untuk Veikkausliiga (Liga Utama Finlandia).
Lakukan analisis taktis mendalam dan prediksi hasil taruhan untuk pertandingan berikut:

HOME TEAM: ${homeTeam.name} (${homeTeam.shortName})
- Kota Asal: ${homeTeam.city}
- Markas/Stadion: ${homeTeam.stadium} (Kapasitas: ${homeTeam.capacity})
- Gaya Bermain Taktis: ${homeTeam.tacticalStyle}
- Lapangan Biasa Tim: ${homeTeam.pitchType}
- Klasemen Saat Ini: Main ${homeTeam.stats.played}, Menang ${homeTeam.stats.wins}, Seri ${homeTeam.stats.draws}, Kalah ${homeTeam.stats.losses}, Gol ${homeTeam.stats.goalsFor}-${homeTeam.stats.goalsAgainst}, Poin ${homeTeam.stats.points}
- Pemain Kunci Aktif: ${activeHomePlayers.map((p) => `${p.name} (${p.position}, Rating: ${p.rating}, Form: ${p.formRating}/10, Peran: ${p.roleDescription})`).join(', ')}
- Pemain Cedera/Absen: ${injuredHomePlayers.map((p) => `${p.name} (${p.position})`).join(', ') || 'Tidak ada'}

AWAY TEAM: ${awayTeam.name} (${awayTeam.shortName})
- Kota Asal: ${awayTeam.city}
- Markas/Stadion: ${awayTeam.stadium} (Kapasitas: ${awayTeam.capacity})
- Gaya Bermain Taktis: ${awayTeam.tacticalStyle}
- Lapangan Biasa Tim: ${awayTeam.pitchType}
- Klasemen Saat Ini: Main ${awayTeam.stats.played}, Menang ${awayTeam.stats.wins}, Seri ${awayTeam.stats.draws}, Kalah ${awayTeam.stats.losses}, Gol ${awayTeam.stats.goalsFor}-${awayTeam.stats.goalsAgainst}, Poin ${awayTeam.stats.points}
- Pemain Kunci Aktif: ${activeAwayPlayers.map((p) => `${p.name} (${p.position}, Rating: ${p.rating}, Form: ${p.formRating}/10, Peran: ${p.roleDescription})`).join(', ')}
- Pemain Cedera/Absen: ${injuredAwayPlayers.map((p) => `${p.name} (${p.position})`).join(', ') || 'Tidak ada'}

KONDISI LAGA & LINGKUNGAN:
- Stadion Pertandingan: ${homeTeam.stadium} (Kandang ${homeTeam.shortName})
- Jenis Lapangan yang Digunakan: ${settings.pitchType} (Penting: Lapangan ${settings.pitchType} dapat mempengaruhi kontrol bola tim yang tidak terbiasa!)
- Cuaca Pertandingan: ${settings.weather} (Cuaca dingin atau hujan di Finlandia sering meredam produktivitas gol)
- Tingkat Kepentingan: ${settings.importanceFactor}

DATA HISTORIS HEAD-TO-HEAD (H2H 5 Laga Terakhir):
- Main: ${h2h.played}
- Kemenangan ${homeTeam.shortName}: ${h2h.homeWins}
- Kemenangan ${awayTeam.shortName}: ${h2h.awayWins}
- Seri: ${h2h.draws}
- Total Gol ${homeTeam.shortName}: ${h2h.homeGoals}
- Total Gol ${awayTeam.shortName}: ${h2h.awayGoals}

RUJUKAN PREDIKSI STATISTIK (Dapat Anda sesuaikan secara taktis):
- Kemungkinan ${homeTeam.shortName} Menang: ${statsPrediction.homeWinProb}%
- Kemungkinan Seri: ${statsPrediction.drawProb}%
- Kemungkinan ${awayTeam.shortName} Menang: ${statsPrediction.awayWinProb}%
- Prediksi Skor Matematika: ${statsPrediction.predictedScore}
- Over 2.5 Goals: ${statsPrediction.over25Prob}%
- Kedua Tim Mencetak Gol (BTTS): ${statsPrediction.bttsProb}%

TUGAS ANDA:
Berikan analisis mendalam dalam bahasa Indonesia tentang bagaimana pertandingan ini akan berlangsung. Sifat analisis harus realistis, taktis, mendalam, dan langsung menuju poin taruhan terbaik.
Gunakan JSON response format yang sudah ditentukan untuk mengembalikan data analisis terstruktur lengkap dengan presentase probabilitas yang akurat, analisis taktis, dampak pemain kunci, analisis taruhan bernilai (value betting), dan 3 rekomendasi taruhan yang spesifik.
  `;

  try {
    // Generate prediction using Gemini with full structured JSON response
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: [
            'homeWinProb',
            'drawProb',
            'awayWinProb',
            'expectedHomeGoals',
            'expectedAwayGoals',
            'over25Prob',
            'bttsProb',
            'predictedScore',
            'confidenceScore',
            'aiAnalysis',
          ],
          properties: {
            homeWinProb: { type: Type.INTEGER, description: 'Probabilitas kemenangan tim tuan rumah dalam % (5 s.d. 90)' },
            drawProb: { type: Type.INTEGER, description: 'Probabilitas hasil seri dalam %' },
            awayWinProb: { type: Type.INTEGER, description: 'Probabilitas kemenangan tim tamu dalam % (5 s.d. 90)' },
            expectedHomeGoals: { type: Type.NUMBER, description: 'Ekspektasi jumlah gol tim tuan rumah (misal 1.7)' },
            expectedAwayGoals: { type: Type.NUMBER, description: 'Ekspektasi jumlah gol tim tamu (misal 1.1)' },
            over25Prob: { type: Type.INTEGER, description: 'Probabilitas total gol > 2.5 dalam %' },
            bttsProb: { type: Type.INTEGER, description: 'Probabilitas kedua tim mencetak gol (BTTS) dalam %' },
            predictedScore: { type: Type.STRING, description: 'Prediksi skor akhir yang paling mungkin, format: H-A (misal "2-1")' },
            confidenceScore: { type: Type.INTEGER, description: 'Skor keyakinan analisis secara keseluruhan dalam skala 1-100' },
            aiAnalysis: {
              type: Type.OBJECT,
              required: ['tacticalMatchup', 'keyPlayerImpact', 'bettingValueAnalysis', 'suggestedTips'],
              properties: {
                tacticalMatchup: {
                  type: Type.STRING,
                  description: 'Analisis benturan taktik kedua tim, pengaruh jenis lapangan, dan dampak cuaca. Tulis minimal 3 kalimat mendalam.',
                },
                keyPlayerImpact: {
                  type: Type.STRING,
                  description: 'Dampak ketidakhadiran pemain cedera dan performa pemain kunci yang aktif di lapangan. Tulis minimal 2 kalimat mendalam.',
                },
                bettingValueAnalysis: {
                  type: Type.STRING,
                  description: 'Analisis nilai taruhan terbaik. Di mana letak celah yang menguntungkan petaruh berdasarkan data statistik dan taktik ini.',
                },
                suggestedTips: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['type', 'bet', 'oddsSimulated', 'confidence', 'justification'],
                    properties: {
                      type: { type: Type.STRING, description: 'Kategori taruhan (misal: "1X2", "Over/Under", "BTTS", "Handicap")' },
                      bet: { type: Type.STRING, description: 'Opsi taruhan yang disarankan (misal: "HJK Helsinki -0.5" atau "Under 2.5")' },
                      oddsSimulated: { type: Type.NUMBER, description: 'Simulasi odds pasar yang adil untuk opsi tersebut (misal: 1.85)' },
                      confidence: { type: Type.STRING, description: 'Tingkat keyakinan: "High", "Medium", atau "Low"' },
                      justification: { type: Type.STRING, description: 'Alasan taktis/statistik mengapa memilih opsi taruhan ini.' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const parsedResponse = JSON.parse(response.text.trim());
    return res.json({
      ...parsedResponse,
      isAiPowered: true,
    });
  } catch (error) {
    console.error('Gemini prediction error:', error);
    // On failure, return the high-fidelity local statistical prediction so the app continues seamlessly
    return res.json({
      ...statsPrediction,
      isAiPowered: false,
      aiNotice: 'Gagal menghubungi Gemini AI. Menggunakan model statistik cadangan yang aman.',
    });
  }
});

// Setup Vite Dev server for non-production environments
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
