export interface PlaceDrawing {
  place: number;
  image: string;
}

export interface PlaceResponse {
  id: number;
  qr_code: string;
  place_name: string;
  city: string;
  country: string;
  latidude: number;
  longitude: number;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  drawings: PlaceDrawing[];
}

export interface Places {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlaceResponse[];
}

export interface PlaceDrawingsUrls {
  data: string[];
}
