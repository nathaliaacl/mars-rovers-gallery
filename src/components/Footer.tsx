"use client";
import { Box, Typography } from "@mui/material";

export const Footer = () => (
  <Box sx={{ p: 2, textAlign: "center", color: "#fff", backgroundColor: "#000" }}>
    <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
      &copy; {new Date().getFullYear()} Mars Rover Gallery - UniverseEx
    </Typography>
    <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
      Valcann | Cloud Intelligence
    </Typography>
  </Box>
);
