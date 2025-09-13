"use client";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Photo } from "../types/Photo";

const getRandomHeight = () => 120 + Math.floor(Math.random() * 150);

interface Props {
  photo: Photo;
}

export const PhotoCard = ({ photo }: Props) => {
  const randomHeight = getRandomHeight();

  return (
    <Card
      sx={{
        position: "relative",
        backgroundColor: "#121212",
        color: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        image={photo.img_src.replace("http://", "https://")}
        alt={photo.camera.full_name}
        sx={{
          width: "100%",
          height: randomHeight,
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          position: "absolute",
          bottom: 8,
          left: 8,
          bgcolor: "rgba(0,0,0,0.6)",
          borderRadius: "12px 12px 12px 0",
          py: 0.5,
          px: 1.5,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600, display: "block" }}>
          {photo.rover.name}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", opacity: 0.8 }}>
          {photo.camera.full_name}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          {photo.earth_date}
        </Typography>
      </CardContent>
    </Card>
  );
};
