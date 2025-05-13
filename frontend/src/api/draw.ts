import { client } from "./client";

export const saveDrawing = (image: string) => {
  return client.post("/drawings/", { image }).then((response) => response.data);
};
