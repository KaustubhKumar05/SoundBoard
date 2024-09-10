import { create } from "zustand";
import { BoardStore, ButtonConfig, PadConfig } from "../types/index";
import { DURATION } from "../constants";

const useBoardStore = create<BoardStore>((set) => ({
  boardName: "Default",
  setBoardName: (newName: string) => set({ boardName: newName }),
  boardList: [],
  setBoardList: (newList: string[]) => set({ boardList: newList }),
  buttons: [
    { keyBinding: "q", note: "C4", duration: DURATION, id: "0" },
    { keyBinding: "w", note: "E4", duration: DURATION, id: "1" },
    { keyBinding: "e", note: "G4", duration: DURATION, id: "2" },
    { keyBinding: "r", note: "C5", duration: DURATION, id: "3" },
    { keyBinding: "a", note: "D4", duration: DURATION, id: "4" },
    { keyBinding: "s", note: "A4", duration: DURATION, id: "5" },
    { keyBinding: "d", note: "E5", duration: DURATION, id: "6" },
    { keyBinding: "f", note: "G5", duration: DURATION, id: "7" },
    { keyBinding: "z", note: "D5", duration: DURATION, id: "8" },
    { keyBinding: "x", note: "A5", duration: DURATION, id: "9" },
    { keyBinding: "c", note: "E6", duration: DURATION, id: "10" },
    { keyBinding: "v", note: "C6", duration: DURATION, id: "11" },
  ],
  setButtons: (updatedButtons: ButtonConfig[]) =>
    set({ buttons: updatedButtons }),
  loops: [
    { keyBinding: "p", note: "C1", duration: DURATION, interval: 1, id: "12" },
    { keyBinding: "l", note: "E2", duration: DURATION, interval: 1, id: "13" },
    { keyBinding: "m", note: "C3", duration: DURATION, interval: 1, id: "14" },
  ],
  setLoops: (updatedLoops: ButtonConfig[]) => set({ loops: updatedLoops }),
  selectedPad: null,
  setSelectedPad: (pad: PadConfig) => set({ selectedPad: pad }),
}));

export default useBoardStore;
