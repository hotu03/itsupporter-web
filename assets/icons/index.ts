// Icon mapping for Font Awesome CSS classes
export const ICON_MAP = {
  // Dashboard
  dashboard: 'fas fa-home',
  machines: 'fas fa-cog',
  customers: 'fas fa-users',
  personnel: 'fas fa-users',
  finance: 'fas fa-dollar-sign',
  notifications: 'fas fa-bell',
  search: 'fas fa-search',
  filter: 'fas fa-filter',

  // Machine Management
  laptop: 'fas fa-laptop',
  desktop: 'fas fa-desktop',
  monitor: 'fas fa-desktop',
  printer: 'fas fa-print',
  receipt: 'fas fa-file-alt',
  add_machine: 'fas fa-plus',
  status_pending: 'fas fa-clock',
  status_running: 'fas fa-wrench',
  status_complete: 'fas fa-check-circle',

  // Personnel Management
  admin: 'fas fa-user-shield',
  technician: 'fas fa-user-cog',
  tester: 'fas fa-user-check',
  users: 'fas fa-users',
  add_user: 'fas fa-plus',
  approve: 'fas fa-check',
  create: 'fas fa-plus-circle',

  // Finance
  transactions: 'fas fa-dollar-sign',
  services: 'fas fa-cog',
  discounts: 'fas fa-tag',
  invoices: 'fas fa-file-invoice',
  add_service: 'fas fa-plus',
  add_discount: 'fas fa-plus',

  // Customer
  customer: 'fas fa-user',
  my_machines: 'fas fa-laptop',
  profile: 'fas fa-user-circle',

  // Actions (Common)
  add: 'fas fa-plus',
  edit: 'fas fa-pen',
  delete: 'fas fa-trash',
  save: 'fas fa-save',
  cancel: 'fas fa-times',
  print: 'fas fa-print',
  download: 'fas fa-download',
  refresh: 'fas fa-sync',
  loading: 'fas fa-spinner',

  // Status
  success: 'fas fa-check-circle',
  error: 'fas fa-times-circle',
  warning: 'fas fa-exclamation-triangle',
  info: 'fas fa-info-circle',

  // Navigation
  menu: 'fas fa-bars',
  close: 'fas fa-times',
  back: 'fas fa-arrow-left',
  forward: 'fas fa-arrow-right',
  logout: 'fas fa-sign-out-alt',
} as const;

export type IconName = keyof typeof ICON_MAP;

// Re-export for backward compatibility
export const ICONS = ICON_MAP;