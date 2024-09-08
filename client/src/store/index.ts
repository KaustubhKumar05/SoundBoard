import { create } from "zustand";
import { BoardStore, ButtonConfig, PadConfig } from "../types/index";

const useBoardStore = create<BoardStore>((set) => ({
  buttons: [
    { keyBinding: "q", note: "C4", duration: "8n", id: "asdf" },
    { keyBinding: "w", note: "E4", duration: "8n", id: "qwe" },
    { keyBinding: "e", note: "G4", duration: "8n", id: "rewrwes" },
    { keyBinding: "r", note: "C5", duration: "8n", id: "rewd" },
    { keyBinding: "a", note: "D4", duration: "8n", id: "refdw" },
    { keyBinding: "s", note: "A4", duration: "8n", id: "tgfv" },
    { keyBinding: "d", note: "E5", duration: "8n", id: "yi" },
    { keyBinding: "f", note: "G5", duration: "8n", id: "iuo" },
    { keyBinding: "z", note: "D5", duration: "8n", id: "fdsgz" },
    { keyBinding: "x", note: "A5", duration: "8n", id: "lk" },
    { keyBinding: "c", note: "E6", duration: "8n", id: "ryt" },
    { keyBinding: "v", note: "C6", duration: "8n", id: "cvxb" },
  ],
  setButtons: (updatedButtons: ButtonConfig[]) =>
    set({ buttons: updatedButtons }),
  loops: [
    { keyBinding: "p", note: "C1", duration: "8n", interval: 1, id: "ihj" },
    { keyBinding: "l", note: "E2", duration: "8n", interval: 1, id: "jbhkn" },
    { keyBinding: "m", note: "C3", duration: "8n", interval: 1, id: "dsf" },
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
