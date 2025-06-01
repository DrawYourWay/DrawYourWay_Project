import { PlaceResponse } from "@/types/places/place";
import { Button, GridItem, Heading, Image, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";

interface PlaceShowcaseCardProps {
  place: PlaceResponse;
}

const PlaceShowcaseCard = ({ place }: PlaceShowcaseCardProps) => {
  const navigate = useNavigate();

  const goToDrawings = () => {
    navigate(`/place/${place.id}`);
  };

  const goToDrawingBoard = () => {
    navigate(`/draw?place_id=${encodeURIComponent(place.id)}`);
  };

  return (
    <GridItem
      colSpan={[2, 1]}
      h="100%"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack backgroundColor="#a3a39e" p={4} borderRadius={10} w="100%">
        <Image
          src={place.image}
          alt={place.place_name}
          width="100%"
          height="auto"
        />
        <Heading
          fontFamily="armstrong"
          as="h2"
          fontSize={["2xl", "3xl"]}
          textAlign="center"
          m={2}
        >
          {place.place_name}
        </Heading>
        <Button
          onClick={goToDrawings}
          backgroundColor="darkGray"
          color="white"
          fontSize="lg"
          paddingTop={6}
          paddingBottom={6}
          width="80%"
          mt={4}
          fontWeight="bold"
          borderRadius={30}
        >
          See drawings!
        </Button>
        <Button
          onClick={goToDrawingBoard}
          backgroundColor="darkGray"
          color="white"
          fontSize="lg"
          paddingTop={6}
          paddingBottom={6}
          width="80%"
          mt={4}
          fontWeight="bold"
          borderRadius={30}
        >
          Draw!
        </Button>
      </VStack>
    </GridItem>
  );
};

export default PlaceShowcaseCard;
