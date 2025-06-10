export const BACKGROUNDS = {
  // Core background without decorations
  base: 'bg-white dark:bg-[#030712]',

  // Hero-style gradient background (clean version)
  gradient:
    'bg-gradient-to-br from-blue-50/50 dark:from-blue-950/30 via-purple-50/30 dark:via-purple-950/20 to-teal-50/50 dark:to-teal-950/30',

  // Card backgrounds
  card: 'bg-white/80 dark:bg-slate-800/80',
  cardSolid: 'bg-white dark:bg-slate-800',

  // Overlay backgrounds
  overlay: 'bg-white/40 dark:bg-[#030712]/60',
} as const;

export const GRADIENTS = {
  text: 'bg-gradient-to-r from-slate-900 dark:from-white via-blue-900 dark:via-blue-100 to-slate-900 dark:to-white',
  accent: 'bg-gradient-to-r from-blue-600 to-purple-600',
  subtle: 'bg-gradient-to-r from-blue-500/10 to-purple-500/10',
} as const;
