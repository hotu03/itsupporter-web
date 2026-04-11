// assets/colors/color-mapping.ts
// Color mapping for semantic usage across the application
// Maps semantic color names to hex values for consistent theming

export const colorMapping = {
  // Brand Colors
  primary: '#3b82f6',
  primaryLight: '#dbeafe',
  primaryDark: '#1d4ed8',

  // Semantic Colors
  success: '#22c55e',
  successLight: '#f0fdf4',
  successDark: '#16a34a',

  warning: '#f59e0b',
  warningLight: '#fffbeb',
  warningDark: '#d97706',

  error: '#ef4444',
  errorLight: '#fef2f2',
  errorDark: '#dc2626',

  info: '#60a5fa',
  infoLight: '#eff6ff',
  infoDark: '#3b82f6',

  // Neutral Colors
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // Status Colors (for machine repair workflow)
  waiting: '#f59e0b',    // warning
  running: '#3b82f6',    // primary
  complete: '#22c55e',   // success
  cancelled: '#ef4444',  // error
  pending: '#6b7280',    // gray-500

  // Role Colors
  admin: '#7c3aed',      // purple
  technician: '#ea580c', // orange
  tester: '#16a34a',     // green
  customer: '#3b82f6',   // blue

  // Accent Colors
  accent: '#a855f7',
  accentLight: '#fdf4ff',
  accentDark: '#9333ea',
} as const;

export type ColorKey = keyof typeof colorMapping;
export type ColorValue = typeof colorMapping[ColorKey];

// Utility function to get color by key
export function getColor(key: ColorKey): ColorValue {
  return colorMapping[key];
}

// Semantic color getters for common use cases
export const colors = {
  // Status colors
  getStatusColor: (status: 'waiting' | 'running' | 'complete' | 'cancelled' | 'pending'): ColorValue => {
    return colorMapping[status];
  },

  // Role colors
  getRoleColor: (role: 'admin' | 'technician' | 'tester' | 'customer'): ColorValue => {
    return colorMapping[role];
  },

  // Semantic colors
  getSemanticColor: (semantic: 'success' | 'warning' | 'error' | 'info'): ColorValue => {
    return colorMapping[semantic];
  },
} as const;