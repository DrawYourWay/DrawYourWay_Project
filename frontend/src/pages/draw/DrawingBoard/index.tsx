import { DrawingMenu } from "@/components";
import { BasicLayout } from "@/layouts";
import { Box, Button } from "@chakra-ui/react";
// import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { useSaveImage } from "@/hooks/useDrawings";
import useDrawingStore from "@/store/useDrawingStore";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const DrawingBoard = () => {
  const {
    mutateAsync: saveImageFunc,
    isPending: savingLoading,
    error: savingError,
  } = useSaveImage();

  const sketchRef = useRef<ReactSketchCanvasRef | null>(null);
  const drawingStore = useDrawingStore();

  useEffect(() => {
    if (drawingStore.activeTool == "eraser" && sketchRef.current) {
      sketchRef.current?.eraseMode(true);
    } else {
      sketchRef.current?.eraseMode(false);
    }

    if (drawingStore.shouldClearCanvas) {
      drawingStore.setShouldClearCanvas(false);
      sketchRef.current?.clearCanvas();
    }

    if (savingError && savingError instanceof AxiosError) {
      toaster.create({
        title: "Error",
        description: savingError.response?.data.detail,
        type: "error",
        duration: 5000,
      });
    }
  }, [drawingStore, savingError]);

  const handleSubmit = async () => {
    const image = await sketchRef.current?.exportImage("png");
    if (image) {
      saveImageFunc({ image });
    }
  };

  return (
    <BasicLayout>
      <Box
        position="relative"
        w="100%"
        h="100%"
        maxW="450px"
        maxH="800px"
        borderColor="black"
        borderWidth="4px"
        borderRadius="10px"
      >
        <ReactSketchCanvas
          ref={sketchRef}
          strokeColor={drawingStore.activeColor}
        />
        <DrawingMenu />
      </Box>
      <Button
        type="submit"
        maxW="450px"
        maxH="450px"
        disabled={savingLoading}
        loading={savingLoading}
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
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </BasicLayout>
  );
};

export default DrawingBoard;
