import { create } from "zustand";
import { BoardStore, ButtonConfig, PadConfig } from "../types/index";

const useBoardStore = create<BoardStore>((set) => ({
  hasUnsavedChanges: false,
  setHasUnsavedChanges: (status: boolean) => set({ hasUnsavedChanges: status }),
  boardName: "Default",
  setBoardName: (newName: string) => set({ boardName: newName }),
  boardList: [],
  inProgress: false,
  setInProgress: (status: boolean) => set({ inProgress: status }),
  setBoardList: (newList: string[]) => set({ boardList: newList }),
  buttons: [
    { keyBinding: "q", note: "C4", duration: "8n", id: "0" },
    { keyBinding: "w", note: "E4", duration: "8n", id: "1" },
    { keyBinding: "e", note: "G4", duration: "8n", id: "2" },
    { keyBinding: "r", note: "C5", duration: "8n", id: "3" },
    { keyBinding: "a", note: "D4", duration: "8n", id: "4" },
    { keyBinding: "s", note: "A4", duration: "8n", id: "5" },
    { keyBinding: "d", note: "E5", duration: "8n", id: "6" },
    { keyBinding: "f", note: "G5", duration: "8n", id: "7" },
    { keyBinding: "z", note: "D5", duration: "8n", id: "8" },
    { keyBinding: "x", note: "A5", duration: "8n", id: "9" },
    { keyBinding: "c", note: "E6", duration: "8n", id: "10" },
    { keyBinding: "v", note: "C6", duration: "8n", id: "11" },
  ],
  setButtons: (updatedButtons: ButtonConfig[]) =>
    set({ buttons: updatedButtons }),
  loops: [
    { keyBinding: "p", note: "C1", duration: "8n", interval: 1, id: "12" },
    { keyBinding: "l", note: "E2", duration: "8n", interval: 1, id: "13" },
    { keyBinding: "m", note: "C3", duration: "8n", interval: 1, id: "14" },
  ],
  setLoops: (updatedLoops: ButtonConfig[]) => set({ loops: updatedLoops }),
  isInputActive: false,
  setIsInputActive: (bool: boolean) => set({ isInputActive: bool }),
  selectedPad: null,
  setSelectedPad: (pad: PadConfig) => set({ selectedPad: pad }),
  showNotes: true,
  setShowNotes: (bool: boolean) => set({ showNotes: bool }),
  showKeyBindings: true,
  setShowKeyBindings: (bool: boolean) => set({ showKeyBindings: bool }),
}));

export default useBoardStore;
