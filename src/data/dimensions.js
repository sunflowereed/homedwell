import { C } from '../tokens.js'

export const DIMS = [
  { id: 'air',     label: 'Indoor Air Quality',   icon: '🌿', color: C.clay,     score: 45, rec: 'Kitchen ventilation is a priority. Gas cooking without exterior exhaust is a significant pollutant source.', articleId: 'iaq' },
  { id: 'sleep',   label: 'Sleep & Recovery',     icon: '🌙', color: C.mossDark, score: 72, rec: 'Blackout window covering would have the highest impact on your sleep quality right now.', articleId: 'sleep' },
  { id: 'light',   label: 'Natural Light & Mood', icon: '☀️', color: C.bark,     score: 88, rec: 'Morning light exposure is strong. Warm-dimming your evenings will protect sleep quality.', articleId: 'light' },
  { id: 'mental',  label: 'Mental Wellbeing',     icon: '🧠', color: C.moss,     score: 60, rec: 'Acoustic separation in your workspace would reduce daily stress significantly.', articleId: 'mental' },
  { id: 'water',   label: 'Water Quality',        icon: '💧', color: C.accent,   score: 31, rec: 'Professional water testing is your first step — without results, other recommendations are guesswork.', articleId: 'water' },
  { id: 'thermal', label: 'Thermal Comfort',      icon: '🌡️', color: C.warmGray, score: 55, rec: 'Your climate zone creates significant cooling demand. Passive strategies reduce mechanical reliance.', articleId: 'thermal' },
  { id: 'mold',    label: 'Mold & Moisture',      icon: '🌧️', color: C.mold,     score: 62, rec: 'Bathroom ventilation is adequate, but kitchen humidity needs attention.', articleId: 'mold' },
]
