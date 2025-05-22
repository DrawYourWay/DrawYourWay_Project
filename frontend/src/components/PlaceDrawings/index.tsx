import { PlaceDrawing, PlaceDrawingsUrls } from "@/types/places/place";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface PlaceDrawingsProps {
  placeId: string;
}

const PlaceDrawings = ({ placeId }: PlaceDrawingsProps) => {
  const placeWebsocketUrl = `${import.meta.env.VITE_WEBSOCKET_URL}/places/${placeId}/`;
  const [placeWebsocket, setPlaceWebsocket] = useState<WebSocket | null>(null);

  const [drawings, setDrawings] = useState(null);

  // const items: (PlaceDrawing | null)[] = [...drawings];
  const items: null[] = [];
  while (items.length < 30) {
    items.push(null);
  }

  useEffect(() => {
    const websocket = new WebSocket(placeWebsocketUrl);
    setPlaceWebsocket(websocket);

    websocket.onopen = () => {};

    websocket.onmessage = (event) => {
      const eventDrawings: PlaceDrawingsUrls = JSON.parse(event.data);
      const formatedEventDrawings: string[] = eventDrawings.data.map(
        (drawing) => `${import.meta.env.VITE_BACKEND_URL}${drawing}`
      );
      console.log(formatedEventDrawings);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      websocket.close();
    };
  }, [placeWebsocketUrl]);

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      gap={0}
      width="100%"
      height="100%"
    >
      {items.map((drawing, idx) => (
        <GridItem
          key={drawing?.image || idx}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="solid 1px"
          borderColor="black"
        >
          {drawing ? (
            <Image
              src={drawing.image}
              alt={`Drawing ${drawing.place} for place ${placeId}`}
              width="100%"
              height="100%"
              objectFit="contain"
              background="white"
            />
          ) : (
            <Box
              width="100%"
              height="100%"
              background="gray.100"
              borderRadius="md"
            />
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

export default PlaceDrawings;
