import { PlaceResponse, Places } from "@/types/places/place";
import { client } from "./client";

export const getPlace = (placeId: number): Promise<PlaceResponse> =>
  client.get(`/places/${placeId}`).then((response) => response.data);

export const getAllPlaces = (): Promise<Places> =>
  client.get("/places/").then((response) => response.data);
