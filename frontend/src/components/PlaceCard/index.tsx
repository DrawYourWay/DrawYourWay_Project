import { Box, GridItem, Heading, Image, Text } from "@chakra-ui/react";

interface PlaceCardProps {
  qrCodeUrl: string;
  placeImageUrl: string;
  placeName: string;
  description: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
}

const PlaceCard = ({
  qrCodeUrl,
  placeImageUrl,
  placeName,
  description,
}: PlaceCardProps) => {
  console.log(placeImageUrl);
  return (
    <GridItem>
      <Box textAlign="center" marginBottom={20}>
        <Box color="black">
          <Heading color="black" as="h1">
            {placeName}
          </Heading>
          <Text>{description}</Text>
        </Box>
        <Box>
          <Image
            src={placeImageUrl}
            alt="Place Image"
            width={250}
            height={250}
          />
        </Box>
      </Box>
      <Box>
        <Image src={qrCodeUrl} alt="QR Code" width={250} height={250} />
      </Box>
    </GridItem>
  );
};

export default PlaceCard;
