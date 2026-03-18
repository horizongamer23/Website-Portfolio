export const STORAGE_KEYS = {
  GENERAL: 'growth_grid_general',
  HERO: 'growth_grid_hero',
  ABOUT: 'growth_grid_about',
  SERVICES: 'growth_grid_services',
  TESTIMONIALS: 'growth_grid_testimonials',
  PORTFOLIO: 'growth_grid_portfolio',
  FAQ: 'growth_grid_faq',
};

export const getStoredData = (key: string, defaultValue: any) => {
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultValue;
  }
};

export const setStoredData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
