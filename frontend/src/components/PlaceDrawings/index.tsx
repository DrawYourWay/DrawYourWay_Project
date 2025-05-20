import { PlaceDrawing } from "@/types/places/place";
import { Grid, GridItem, Image, Box } from "@chakra-ui/react";

interface PlaceDrawingsProps {
  placeId: string;
  drawings: PlaceDrawing[];
}

const PlaceDrawings = ({ placeId, drawings }: PlaceDrawingsProps) => {
  const items: (PlaceDrawing | null)[] = [...drawings];
  while (items.length < 15) {
    items.push(null);
  }

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap={4}
      width="100%"
      height="100%"
      justifyItems="center"
      alignItems="center"
      margin="auto"
    >
      {items.map((drawing, idx) => (
        <GridItem
          key={drawing?.image || idx}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {drawing ? (
            <Image
              src={drawing.image}
              alt={`Drawing ${drawing.place} for place ${placeId}`}
              width="200px"
              height="200px"
              objectFit="contain"
              background="white"
            />
          ) : (
            <Box
              width="200px"
              height="200px"
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
