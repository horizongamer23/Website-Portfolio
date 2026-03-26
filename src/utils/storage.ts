export const STORAGE_KEYS = {
  GENERAL: 'growth_grid_general_v3',
  HERO: 'growth_grid_hero_v2',
  ABOUT: 'growth_grid_about_v2',
  SERVICES: 'growth_grid_services_v3',
  TESTIMONIALS: 'growth_grid_testimonials_v2',
  PORTFOLIO: 'growth_grid_portfolio_v4',
  FAQ: 'growth_grid_faq_v2',
  PRICING: 'growth_grid_pricing',
  PROCESS: 'growth_grid_process',
  CASE_STUDIES: 'growth_grid_case_studies_v2',
  LEADS: 'growth_grid_leads',
  BLOGS: 'growth_grid_blogs',
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
