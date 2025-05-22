import { PlaceDrawingsUrls } from "@/types/places/place";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface PlaceDrawingsProps {
  placeId: string;
}

const PlaceDrawings = ({ placeId }: PlaceDrawingsProps) => {
  const placeWebsocketUrl = `${import.meta.env.VITE_WEBSOCKET_URL}/places/${placeId}/`;

  const [placeWebsocket, setPlaceWebsocket] = useState<WebSocket | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [drawings, setDrawings] = useState<(string | null)[]>([]);

  const setUpDrawings = (eventDDrawings: PlaceDrawingsUrls) => {
    const formattedDrawings: (string | null)[] = eventDDrawings.data.map(
      (drawing) => `${import.meta.env.VITE_BACKEND_URL}${drawing}`
    );
    while (formattedDrawings.length < 30) {
      formattedDrawings.push(null);
    }
    setDrawings(formattedDrawings);
  };

  useEffect(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      const ws = new WebSocket(placeWebsocketUrl);
      wsRef.current = ws;
      setPlaceWebsocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        setUpDrawings(JSON.parse(event.data));
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
      };
    }

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
        console.log("WebSocket cleanup: closed");
      }
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
      {drawings.map((drawing, idx) => (
        <GridItem
          key={drawing || idx}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="solid 1px"
          borderColor="black"
        >
          {drawing ? (
            <Image
              src={drawing}
              alt={`Drawing ${drawing} for place ${placeId}`}
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
