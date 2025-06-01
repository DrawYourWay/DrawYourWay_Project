import { PlaceShowcaseCard } from "@/components";
import { useAllPlaces } from "@/hooks/usePlace";
import { ColorLayout } from "@/layouts";
import { PlaceResponse } from "@/types/places/place";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AllPlaces = () => {
  const [places, setPlaces] = useState<PlaceResponse[] | null>(null);
  const { mutateAsync } = useAllPlaces();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const fetchedPlaces = await mutateAsync();
        setPlaces(fetchedPlaces.results);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <ColorLayout color="main">
      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          fontFamily="armstrong"
          color="black"
          as="h1"
          fontSize={["2xl", "3xl"]}
          textAlign="center"
          mb={4}
          mt={4}
        >
          Draw Your Way Here!
        </Heading>
        <Grid
          w="100%"
          h="100%"
          templateColumns="repeat(2, 1fr)"
          maxW="600px"
          gap={4}
          p={4}
        >
          {places?.map((place, indx) => (
            <PlaceShowcaseCard key={indx} place={place} />
          ))}
        </Grid>
      </Box>
    </ColorLayout>
  );
};

export default AllPlaces;
