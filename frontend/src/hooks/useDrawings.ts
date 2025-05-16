import { saveDrawing } from "@/api/draw";
import { useMutation } from "@tanstack/react-query";

export const useSaveImage = () =>
  useMutation({
    mutationFn: async ({ image }: { image: string }) =>
      await saveDrawing(image),
  });
