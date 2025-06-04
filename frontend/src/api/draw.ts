import { client } from "./client";

export const saveDrawing = (image: string, placeId: string) =>
  client
    .post("/drawings/", { image, place_id: placeId })
    .then((response) => response.data);
