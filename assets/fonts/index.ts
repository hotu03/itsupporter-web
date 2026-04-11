/**
 * Font family registry — Montserrat
 * Mirrors Font Awesome's family/style/variant pattern:
 *   family  → Montserrat
 *   style   → normal | italic
 *   weight  → 100–900 (variable font, no separate file per weight)
 *   subset  → latin | latin-ext | vietnamese | cyrillic | cyrillic-ext
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FontWeight =
  | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontStyle = 'normal' | 'italic';

export type FontSubset =
  | 'latin'
  | 'latin-ext'
  | 'vietnamese'
  | 'cyrillic'
  | 'cyrillic-ext';

export interface FontDefinition {
  family: string;
  style: FontStyle;
  weights: FontWeight[];
  subsets: FontSubset[];
  cssPath: string;
}

// ---------------------------------------------------------------------------
// Registry — add more font families here as needed
// ---------------------------------------------------------------------------

export const FONT_REGISTRY = {
  montserrat: {
    family: 'Montserrat',
    style: 'normal',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] as FontWeight[],
    subsets: ['latin', 'latin-ext', 'vietnamese', 'cyrillic', 'cyrillic-ext'] as FontSubset[],
    cssPath: './families/montserrat/montserrat.css',
  },
} as const satisfies Record<string, FontDefinition>;

export type FontId = keyof typeof FONT_REGISTRY;

// ---------------------------------------------------------------------------
// Semantic aliases (mirrors Font Awesome's role-based naming)
//   sans    → body / UI text
//   heading → titles and headings
// ---------------------------------------------------------------------------

export const FONT_ROLES = {
  sans:    FONT_REGISTRY.montserrat.family,
  heading: FONT_REGISTRY.montserrat.family,
  mono:    'ui-monospace, "Cascadia Code", "Source Code Pro", monospace',
} as const;

export type FontRole = keyof typeof FONT_ROLES;

// ---------------------------------------------------------------------------
// Weight tokens (named, not magic numbers)
// ---------------------------------------------------------------------------

export const FONT_WEIGHT = {
  thin:       100,
  extralight: 200,
  light:      300,
  regular:    400,
  medium:     500,
  semibold:   600,
  bold:       700,
  extrabold:  800,
  black:      900,
} as const satisfies Record<string, FontWeight>;

export type FontWeightToken = keyof typeof FONT_WEIGHT;

// ---------------------------------------------------------------------------
// Tailwind v3/v4 theme shape (drop into extend.fontFamily / extend.fontWeight)
// ---------------------------------------------------------------------------

export const TAILWIND_FONT_THEME = {
  fontFamily: {
    sans:    [FONT_ROLES.sans,    'system-ui', 'sans-serif'],
    heading: [FONT_ROLES.heading, 'system-ui', 'sans-serif'],
    mono:    [FONT_ROLES.mono],
  },
  fontWeight: Object.fromEntries(
    Object.entries(FONT_WEIGHT).map(([k, v]) => [k, String(v)])
  ) as Record<FontWeightToken, string>,
} as const;

// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

/**
 * Get font-family string for a role.
 * @example fontFamily('heading') // "Montserrat"
 */
export function fontFamily(role: FontRole): string {
  return FONT_ROLES[role];
}

/**
 * Get numeric weight for a named token.
 * @example fontWeight('semibold') // 600
 */
export function fontWeight(token: FontWeightToken): FontWeight {
  return FONT_WEIGHT[token];
}

/**
 * Build an inline style object (handy for React components).
 * @example fontStyle('heading', 'bold') // { fontFamily: 'Montserrat', fontWeight: 700 }
 */
export function fontStyle(
  role: FontRole,
  weight: FontWeightToken = 'regular',
  style: FontStyle = 'normal'
): React.CSSProperties {
  return {
    fontFamily: fontFamily(role),
    fontWeight: fontWeight(weight),
    fontStyle:  style,
  };
}

// ---------------------------------------------------------------------------
// Re-export CSS path for direct use in bundler imports
// ---------------------------------------------------------------------------

export const MONTSERRAT_CSS = FONT_REGISTRY.montserrat.cssPath;
