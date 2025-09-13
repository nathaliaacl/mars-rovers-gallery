"use client";
import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Photo } from "../types/Photo";

const getRandomHeight = () => 120 + Math.floor(Math.random() * 150);

interface Props {
  photo: Photo;
}

export const PhotoCard = ({ photo }: Props) => {
  const [open, setOpen] = useState(false);
  const randomHeight = getRandomHeight();

  return (
    <>
      <Card
        sx={{
          position: "relative",
          backgroundColor: "#121212",
          color: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.7)",
          },
        }}
        onClick={() => setOpen(true)}
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.7)",
            padding: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              bgcolor: "#121212",
              borderRadius: 2,
              boxShadow: 24,
              maxWidth: 600,
              width: "90%",
              maxHeight: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#fff",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            <img
              src={photo.img_src.replace("http://", "https://")}
              alt={photo.camera.full_name}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
