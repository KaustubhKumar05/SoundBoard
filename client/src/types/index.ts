export type ButtonConfig = {
  keyBinding: string;
  note: string;
  duration: string;
  id: string;
  interval?: number;
};

export type PadConfig = ButtonConfig | null;

export type BoardStore = {
  boardName: string;
  setBoardName: (newName: string) => void;
  buttons: ButtonConfig[];
  boardList: string[];
  setBoardList: (newList: string[]) => void;
  setButtons: (updatedButtons: ButtonConfig[]) => void;
  loops: ButtonConfig[];
  setLoops: (updatedLoops: ButtonConfig[]) => void;
  selectedPad: PadConfig;
  setSelectedPad: (pad: PadConfig) => void;
};

export type AppStore = {
  hasUnsavedChanges: boolean;
  currentMode: string;
  setCurrentMode: (mode: string) => void;
  setHasUnsavedChanges: (status: boolean) => void;
  inProgress: boolean;
  setInProgress: (status: boolean) => void;
  isInputActive: boolean;
  setIsInputActive: (bool: boolean) => void;
  showNotes: boolean;
  setShowNotes: (bool: boolean) => void;
  showKeyBindings: boolean;
  setShowKeyBindings: (bool: boolean) => void;
  isRecording: boolean;
  setIsRecording: (bool: boolean) => void;
};
