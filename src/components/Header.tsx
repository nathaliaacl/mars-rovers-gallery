"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar
        sx={{
          p: 2,
          textAlign: "center",
          color: "#fff",
          backgroundColor: "transparent",
          position: "static",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", backgroundColor: "transparent" }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Poppins", flexGrow: 1, textAlign: "center", mt: 4 }}
          >
            Gallery of Mars Rovers
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleOpen}
            sx={{ position: "absolute", right: 16 }}
          >
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>About the Rovers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Curiosity - </strong>  
            Launched in 2011 and landed on Mars in August 2012.  
            Its mission is to explore Gale Crater and investigate whether Mars ever had 
            environmental conditions suitable for microbial life.  

            <br /><br />
            <strong>Perseverance - </strong>  
            Launched in 2020 and landed in February 2021 at Jezero Crater.  
            Its mission is to search for signs of ancient life, collect rock and soil 
            samples, and prepare them for possible return to Earth on a future mission.  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" >Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
