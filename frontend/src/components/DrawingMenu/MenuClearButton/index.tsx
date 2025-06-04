import { Box, Image } from "@chakra-ui/react";
import useDrawingStore from "@/store/useDrawingStore";

const MenuClearButton = () => {
  const drawingStore = useDrawingStore();

  const clearCanvas = () => drawingStore.setShouldClearCanvas(true);

  return (
    <Box onClick={clearCanvas}>
      <Image
        src="/images/eraser.png"
        backgroundColor="lightGray"
        borderRadius="10px"
        width="30px"
        height="30px"
        padding="5px"
        borderStyle="solid"
      />
    </Box>
  );
};

export default MenuClearButton;
