"use client";
import { useState, useEffect } from "react";
import { Photo } from "@/types/Photo";
import { fetchLatestPhotos } from "@/utils/nasaApi";

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY as string;
const rovers = ["curiosity", "perseverance", "opportunity", "spirit"];
const DEFAULT_SOL = 1000;

export const usePhotos = () => {
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const photosPerPage = 24;

  const [filters, setFilters] = useState<{ rover?: string; camera?: string; earth_date?: string }>({});

  const normalizeImg = (src?: string) => {
    if (!src) return null;
    return src.replace(/^http:\/\//i, "https://");
  };

  const fetchPhotosByRoverAndDate = async (rover: string, camera?: string, earth_date?: string) => {
    if (!earth_date) return [];
    const url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`);
    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("earth_date", earth_date);
    if (camera) url.searchParams.set("camera", camera.toLowerCase());
    const res = await fetch(url.toString());
    const json = await res.json();
    return (json.photos ?? []) as Photo[];
  };

  const fetchPhotosByRoverAndSol = async (rover: string, camera?: string, sol: number = DEFAULT_SOL) => {
    const url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`);
    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("sol", String(sol));
    if (camera) url.searchParams.set("camera", camera.toLowerCase());
    const res = await fetch(url.toString());
    const json = await res.json();
    return (json.photos ?? []) as Photo[];
  };

  const fetchLatestByRover = async (rover: string) => {
    const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${API_KEY}`);
    const json = await res.json();
    return (json.latest_photos ?? []) as Photo[];
  };

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      let data: Photo[] = [];

      // 1) Rover + Date + Camera
      if (filters.rover && filters.earth_date && filters.camera) {
        data = await fetchPhotosByRoverAndDate(filters.rover, filters.camera, filters.earth_date);
      }
      // 2) Rover + Date (sem camera)
      else if (filters.rover && filters.earth_date) {
        data = await fetchPhotosByRoverAndDate(filters.rover, undefined, filters.earth_date);
      }
      // 3) Rover + Camera (sem date) -> usa /rovers/{rover}/photos?sol=1000&camera=...
      else if (filters.rover && filters.camera) {
        data = await fetchPhotosByRoverAndSol(filters.rover, filters.camera, DEFAULT_SOL);
      }
      // 4) Apenas Rover (nenhum outro filtro) -> latest_photos do rover
      else if (filters.rover && !filters.camera && !filters.earth_date) {
        data = await fetchLatestByRover(filters.rover);
      }
      // 5) Data (possivelmente com camera, sem rover) -> consultar cada rover em /photos?earth_date=...
      else if (filters.earth_date) {
        const promises = rovers.map(r => fetchPhotosByRoverAndDate(r, filters.camera, filters.earth_date));
        const results = await Promise.all(promises);
        data = results.flat();
      }
      // 6) Apenas Camera (sem rover e sem date) -> pegar latest_photos de cada rover e filtrar
      else if (filters.camera) {
        const promises = rovers.map(r => fetchLatestByRover(r));
        const results = await Promise.all(promises);
        data = results.flat().filter(p => (p.camera?.name ?? "").toLowerCase() === filters.camera?.toLowerCase());
      }
      // 7) Nenhum filtro -> util fetchLatestPhotos
      else {
        data = await fetchLatestPhotos();
      }

      // Normaliza urls e remove itens sem img_src válido
      const cleaned = data
        .map(p => ({ ...p, img_src: normalizeImg(p.img_src) } as Photo))
        .filter(p => p.img_src && p.img_src.startsWith("https://"));

      setAllPhotos(cleaned);
      setPage(1);
    } catch (err: any) {
      console.error("Error fetching photos:", err);
      setError("Error fetching photos. Please try again.");
      setAllPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const start = (page - 1) * photosPerPage;
    const end = start + photosPerPage;
    setPhotos(allPhotos.slice(start, end));
  }, [allPhotos, page]);

  // recarrega quando filtros mudam
  useEffect(() => {
    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(allPhotos.length / photosPerPage));

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  return { photos, loading, error, filters, setFilters, page, setPage, totalPages, clearFilters };
};
