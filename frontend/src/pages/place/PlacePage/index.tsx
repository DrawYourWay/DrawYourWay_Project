import { PlaceCard, PlaceDrawings } from "@/components";
import { useDetailedPlace } from "@/hooks/usePlace";
import { ColorLayout } from "@/layouts";
import { PlaceResponse } from "@/types/places/place";
import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PlacePage = () => {
  const [place, setPlace] = useState<PlaceResponse | null>(null);

  const params = useParams();
  const placeId = params.placeId;

  const {
    mutateAsync: getPlace,
    // isPending: placePending,
    // isError: placeError,
  } = useDetailedPlace();

  useEffect(() => {
    const fetchPlace = async () => {
      const place = await getPlace(Number(placeId));
      setPlace(place);
      console.log(place);
    };
    fetchPlace();
  }, []);

  return (
    <ColorLayout>
      {place && placeId && (
        <Grid templateRows="repeat(3, 1fr)" h="100%" w="100%">
          <PlaceCard
            qrCodeUrl={place?.qr_code}
            placeImageUrl={place?.image}
            placeName={place?.place_name}
            description={place?.description}
            city={place?.city}
            country={place?.country}
            longitude={place?.longitude}
            latitude={place?.latidude}
          />
          <PlaceDrawings placeId={placeId} />
        </Grid>
      )}
    </ColorLayout>
  );
};

export default PlacePage;
