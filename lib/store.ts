'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Inquiry, FavoriteItem } from './types';

interface AppStore {
  // Inquiries (local history)
  inquiries: Inquiry[];
  addInquiry: (inquiry: Inquiry) => void;
  clearInquiries: () => void;

  // Favorites
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Merchant filter state
  merchantFilters: {
    industry: string;
    chamber_position: string;
    region: string;
    search: string;
  };
  setMerchantFilters: (filters: Partial<AppStore['merchantFilters']>) => void;
  resetMerchantFilters: () => void;
}

const defaultFilters = {
  industry: '',
  chamber_position: '',
  region: '',
  search: '',
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      inquiries: [],
      addInquiry: (inquiry) =>
        set((s) => ({ inquiries: [inquiry, ...s.inquiries] })),
      clearInquiries: () => set({ inquiries: [] }),

      favorites: [],
      addFavorite: (item) =>
        set((s) => ({
          favorites: s.favorites.some((f) => f.id === item.id)
            ? s.favorites
            : [item, ...s.favorites],
        })),
      removeFavorite: (id) =>
        set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      merchantFilters: defaultFilters,
      setMerchantFilters: (filters) =>
        set((s) => ({ merchantFilters: { ...s.merchantFilters, ...filters } })),
      resetMerchantFilters: () => set({ merchantFilters: defaultFilters }),
    }),
    {
      name: 'chamber-b2b-store',
      partialize: (state) => ({
        inquiries: state.inquiries,
        favorites: state.favorites,
      }),
    }
  )
);

export const useUserStore = useAppStore;
