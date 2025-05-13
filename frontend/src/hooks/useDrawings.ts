import { saveDrawing } from "@/api/draw";
import { useMutation } from "@tanstack/react-query";

export const useSaveImage = () =>
  useMutation({
    mutationFn: async ({ image }: { image: string }) => {
      const response = await saveDrawing(image);
      console.log(response);
    },
  });
