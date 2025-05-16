import { client } from "./client";
import { PlaceResponse } from "@/types/places/place";

export const getPlace = (placeId: number): Promise<PlaceResponse> =>
  client.get(`/places/${placeId}`).then((response) => response.data);
