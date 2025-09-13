"use client";
import { Masonry } from "@mui/lab";
import { Photo } from "../types/Photo";
import { PhotoCard } from "./PhotoCard";

interface Props {
  photos: Photo[];
}

export const MasonryLayout = ({ photos }: Props) => (
  <Masonry columns={4} spacing={2}>
    {photos.map(photo => (
      <PhotoCard key={photo.id} photo={photo} />
    ))}
  </Masonry>
);
