import { Box, GridItem, Heading, Image } from "@chakra-ui/react";

interface PlaceCardProps {
  qrCodeUrl: string;
  placeImageUrl: string;
  placeName: string;
}

const PlaceCard = ({ qrCodeUrl, placeImageUrl, placeName }: PlaceCardProps) => {
  return (
    <GridItem
      color="white"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Box textAlign="center" marginBottom={20}>
        <Heading
          as="h2"
          fontFamily="armstrong"
          fontSize={["4xl"]}
          marginBottom={5}
        >
          {placeName}
        </Heading>
        <Box>
          <Image
            src={placeImageUrl}
            alt="Place Image"
            width={250}
            height={250}
          />
        </Box>
      </Box>
      <Heading
        as="h2"
        textAlign="center"
        fontFamily="armstrong"
        fontSize={["4xl"]}
        marginBottom={5}
      >
        SCAN AND DRAW
      </Heading>
      <Box>
        <Image src={qrCodeUrl} alt="QR Code" width={250} height={250} />
      </Box>
    </GridItem>
  );
};

export default PlaceCard;
