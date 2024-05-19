import { create } from "zustand";

export const useAppStore = create((set) => ({
  selectedId: [],
  setSelectedId: (data: any) => set({ selectedId: data }),
  deleteSelectedId: () => set({ selectedId: [] }),

  isEdit: false,
  setIsEdit: (status: boolean) => set({ isEdit: status }),
}));
