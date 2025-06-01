import { DrawingMenu } from "@/components";
import { toaster } from "@/components/ui/toaster";
import { useSaveImage } from "@/hooks/useDrawings";
import { BasicLayout } from "@/layouts";
import useDrawingStore from "@/store/useDrawingStore";
import { Box, Button } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const DrawingBoard = () => {
  const {
    mutateAsync: saveImageFunc,
    isPending: savingLoading,
    error: savingError,
    isSuccess: savingSuccess,
  } = useSaveImage();

  const sketchRef = useRef<ReactSketchCanvasRef | null>(null);
  const drawingStore = useDrawingStore();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const placeId = searchParams.get("place_id");
  console.log("placeId", placeId);

  useEffect(() => {
    if (!placeId) navigate("/places");

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

    if (savingSuccess) {
      toaster.create({
        title: "Success",
        description: "Drawing saved successfully",
        type: "success",
        duration: 5000,
      });
      sketchRef.current?.clearCanvas();
      navigate(`/place/${placeId}`);
    }
  }, [drawingStore, savingError, savingSuccess, placeId]);
  const handleSubmit = async () => {
    const image = await sketchRef.current?.exportImage("png");
    if (image && placeId) {
      saveImageFunc({ image, placeId });
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
          style={{
            height: "450px",
          }}
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
        m={4}
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
