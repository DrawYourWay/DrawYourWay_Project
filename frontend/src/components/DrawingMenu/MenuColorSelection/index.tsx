import useDrawingStore from "@/store/useDrawingStore";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

const MenuColorSelection = () => {
  const drawingStore = useDrawingStore();
  const pickerRef = useRef<HTMLDivElement>(null);

  const activatecolorPicker = () =>
    drawingStore.setUseColorPicker(!drawingStore.useColorPicker);

  const handleColorChange = (color: string) =>
    drawingStore.setActiveColor(color);

  useEffect(() => {
    if (!drawingStore.useColorPicker) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        drawingStore.setUseColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawingStore.useColorPicker]);

  return (
    <Box
      width="30px"
      height="30px"
      backgroundColor="lightGray"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="10px"
      onClick={activatecolorPicker}
    >
      {drawingStore.useColorPicker && (
        <HexColorPicker
          style={{
            zIndex: 100,
            left: 0,
            bottom: 0,
            position: "absolute",
            width: "200px",
            height: "200px",
            transform: "translateY(-50%)",
          }}
          color={drawingStore.activeColor}
          onChange={handleColorChange}
        />
      )}
      <Box
        width="20px"
        height="20px"
        borderRadius="50%"
        backgroundColor={drawingStore.activeColor}
        borderStyle="solid"
        borderColor={drawingStore.activeColor !== "#000000" ? "black" : "white"}
        borderWidth="1px"
      />
    </Box>
  );
};

export default MenuColorSelection;
