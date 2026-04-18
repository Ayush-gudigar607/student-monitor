import { create } from "zustand";

type UIState = {
  darkMode: boolean;
  selectedClass: string;
  selectedClassId: number | null;
  toggleTheme: () => void;
  setSelectedClass: (value: string, id: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
  darkMode: false,
  selectedClass: "All Classes",
  selectedClassId: null,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  setSelectedClass: (value, id) => set({ selectedClass: value, selectedClassId: id }),
}));
