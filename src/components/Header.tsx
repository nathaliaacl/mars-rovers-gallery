"use client";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => (
  <AppBar sx={{ p: 2, textAlign: "center", color: "#fff", backgroundColor: "#000", position: "static" }}>
    <Toolbar sx={{ justifyContent: 'center', backgroundColor: '#0000' }}>
      <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>
        Gallery of Mars Rover
      </Typography>
    </Toolbar>
  </AppBar>
);