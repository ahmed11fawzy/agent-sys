import { createSlice , type PayloadAction } from '@reduxjs/toolkit';

type Theme = 'dark' | 'light' ;
export type Language = 'en' | 'ar';

interface SettingsState {
  theme: Theme;
  language: Language;
}

// 1. Initialize from LocalStorage or Default
const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState: SettingsState = {
  theme: getInitialTheme(),
  language: (localStorage.getItem('language') as Language) || 'ar',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;