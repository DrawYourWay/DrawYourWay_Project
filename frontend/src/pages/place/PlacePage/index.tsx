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
      console.log(place);
      setPlace(place);
      console.log(place);
    };
    fetchPlace();
  }, []);

  return (
    <ColorLayout>
      {place && placeId && (
        <Grid templateColumns="1fr 3fr" height="100vh" width="100vw" gap={0}>
          <PlaceCard
            qrCodeUrl={place?.qr_code}
            placeImageUrl={place?.image}
            placeName={place?.place_name}
          />
          <PlaceDrawings placeId={placeId} drawings={place.drawings} />
        </Grid>
      )}
    </ColorLayout>
  );
};

export default PlacePage;
