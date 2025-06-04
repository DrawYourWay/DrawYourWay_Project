import { ToolName } from "@/types/draw/tool";
import { create } from "zustand";

interface State {
  activeTool: ToolName;
  activeColor: string;
  useColorPicker: boolean;
  shouldClearCanvas: boolean;
}

interface Actions {
  setActiveTool: (toolName: ToolName) => void;
  setActiveColor: (color: string) => void;
  setUseColorPicker: (useColorPicker: boolean) => void;
  setShouldClearCanvas: (shouldClearCanvas: boolean) => void;
}

const useDrawingStore = create<State & Actions>((set) => ({
  activeTool: "pen",
  activeColor: "#000000",
  useColorPicker: false,
  shouldClearCanvas: false,
  setActiveTool: (toolName: ToolName) => set({ activeTool: toolName }),
  setActiveColor: (color: string) => set({ activeColor: color }),
  setUseColorPicker: (useColorPicker: boolean) => set({ useColorPicker }),
  setShouldClearCanvas: (shouldClearCanvas: boolean) =>
    set({ shouldClearCanvas }),
}));

export default useDrawingStore;
