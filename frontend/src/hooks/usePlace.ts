import { getAllPlaces, getPlace } from "@/api/place";
import { useMutation } from "@tanstack/react-query";

export const useAllPlaces = () =>
  useMutation({
    mutationFn: async () => await getAllPlaces(),
  });

export const useDetailedPlace = () =>
  useMutation({
    mutationFn: async (placeId: number) => await getPlace(placeId),
  });
