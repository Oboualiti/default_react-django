export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const PAGINATION_OPTIONS = [25, 50, 100, 200];

export const STATUS_CONFIG = {
  active: { label: 'Active', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  inactive: { label: 'Inactive', color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  error: { label: 'Error', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};
