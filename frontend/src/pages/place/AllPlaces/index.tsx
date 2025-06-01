import { useAllPlaces } from "@/hooks/usePlace";
import { ColorLayout } from "@/layouts";
import { PlaceResponse } from "@/types/places/place";
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
      <h1>All Places</h1>
    </ColorLayout>
  );
};

export default AllPlaces;
