import { BasicLayout } from "@/layouts";
import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const sketchCanvasStyles = {};

const DrawingBoard = () => {
  const [drawingColor, setDrawingColor] = useState<string>("#ffffff");
  const canvasRef = useRef<ReactSketchCanvas>(null);

  const exportDrawingToImage = async () => {};

  return (
    <BasicLayout>
      <ReactSketchCanvas ref={canvasRef} strokeColor={drawingColor} />
      <Button
        type="submit"
        // disabled={isPending}
        // loading={isPending}
        loadingText="Uploading image..."
        backgroundColor="darkGray"
        color="white"
        fontSize="lg"
        paddingTop={6}
        paddingBottom={6}
        width="80%"
        mt={4}
        fontWeight="bold"
        borderRadius={30}
      >
        Submit
      </Button>
    </BasicLayout>
  );
};

export default DrawingBoard;
