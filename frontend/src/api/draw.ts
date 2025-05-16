import { client } from "./client";

export const saveDrawing = (image: string) =>
  client.post("/drawings/", { image }).then((response) => response.data);
