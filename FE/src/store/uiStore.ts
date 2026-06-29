import { create } from 'zustand'

interface UIState {
  // Sidebar
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // Mobile menu
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void

  // Search overlay
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void

  // Cart drawer
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  mobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
}))
