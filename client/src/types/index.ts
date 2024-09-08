export type ButtonConfig = {
  keyBinding: string;
  note: string;
  duration: string;
  id: string;
  interval?: number;
};

export type PadConfig = ButtonConfig | null;

export type BoardStore = {
  buttons: ButtonConfig[];
  boardList: string[];
  setBoardList: (newList: string[]) => void;
  setButtons: (updatedButtons: ButtonConfig[]) => void;
  loops: ButtonConfig[];
  setLoops: (updatedLoops: ButtonConfig[]) => void;
  isInputActive: boolean;
  setIsInputActive: (bool: boolean) => void;
  selectedPad: PadConfig;
  setSelectedPad: (pad: PadConfig) => void;
  showNotes: boolean;
  setShowNotes: (bool: boolean) => void;
  showKeyBindings: boolean;
  setShowKeyBindings: (bool: boolean) => void;
};
