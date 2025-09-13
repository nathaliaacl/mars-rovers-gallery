import { Photo } from "../types/Photo";

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY as string;

export const fetchPhotos = async (
  rover: string = "curiosity",
  camera?: string,
  earth_date?: string,
  page: number = 1
): Promise<Photo[]> => {
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${API_KEY}&page=${page}`;

  if (camera) url += `&camera=${camera}`;
  if (earth_date) url += `&earth_date=${earth_date}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.photos;
};

export const fetchLatestPhotos = async (): Promise<Photo[]> => {
  const last_rovers = ["curiosity", "perseverance"];
  const promises = last_rovers.map(rover =>
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => data.latest_photos)
  );
  const results = await Promise.all(promises);
  return results.flat();
};
