import { saveDrawing } from "@/api/draw";
import { useMutation } from "@tanstack/react-query";

export const useSaveImage = () =>
  useMutation({
    mutationFn: async ({
      image,
      placeId,
    }: {
      image: string;
      placeId: string;
    }) => await saveDrawing(image, placeId),
  });
