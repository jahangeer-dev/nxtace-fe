import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Template } from '../types';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

interface TemplateStore {
  templates: Template[];
  favorites: Template[];
  setTemplates: (templates: Template[]) => void;
  setFavorites: (favorites: Template[]) => void;
  addFavorite: (template: Template) => void;
  removeFavorite: (templateId: string) => void;
  isFavorite: (templateId: string) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user: User, accessToken: string) => {
        set({ user, accessToken, isAuthenticated: true });
      },
      setAccessToken: (accessToken: string) => {
        set({ accessToken });
      },
      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () => {
        const newTheme = !get().isDark;
        set({ isDark: newTheme });
        if (newTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setTheme: (isDark: boolean) => {
        set({ isDark });
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useTemplateStore = create<TemplateStore>()(
  (set, get) => ({
    templates: [],
    favorites: [],
    setTemplates: (templates) => set({ templates }),
    setFavorites: (favorites) => set({ favorites }),
    addFavorite: (template) => {
      const { favorites } = get();
      if (!favorites.find(f => f._id === template._id)) {
        set({ favorites: [...favorites, template] });
      }
    },
    removeFavorite: (templateId) => {
      const { favorites } = get();
      set({ favorites: favorites.filter(f => f._id !== templateId) });
    },
    isFavorite: (templateId) => {
      const { favorites } = get();
      return favorites.some(f => f._id === templateId);
    },
  })
);
