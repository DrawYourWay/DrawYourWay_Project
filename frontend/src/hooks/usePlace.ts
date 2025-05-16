import { useMutation } from "@tanstack/react-query";
import { getPlace } from "@/api/place";

export const useDetailedPlace = () =>
  useMutation({
    mutationFn: async (placeId: number) => {
      const response = await getPlace(placeId);
      return response;
    },
  });
