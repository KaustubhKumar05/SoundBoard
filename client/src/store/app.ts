import { create } from "zustand";
import { AppStore } from "../types/index";
import { MODE } from "../constants";

const useAppStore = create<AppStore>((set) => ({
  currentMode: MODE.RECORDER,
  setCurrentMode: (mode: string) => set({ currentMode: mode }),
  hasUnsavedChanges: false,
  setHasUnsavedChanges: (status: boolean) => set({ hasUnsavedChanges: status }),
  inProgress: false,
  setInProgress: (status: boolean) => set({ inProgress: status }),
  isInputActive: false,
  setIsInputActive: (bool: boolean) => set({ isInputActive: bool }),
  showNotes: true,
  setShowNotes: (bool: boolean) => set({ showNotes: bool }),
  showKeyBindings: true,
  setShowKeyBindings: (bool: boolean) => set({ showKeyBindings: bool }),
}));

export default useAppStore;
