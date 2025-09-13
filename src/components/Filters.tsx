"use client";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parse } from 'date-fns';
import React from "react";

interface Props {
  rover?: string;
  camera?: string;
  earth_date?: string;
  setFilters: (filters: { rover?: string; camera?: string; earth_date?: string }) => void;
  clearFilters: () => void;
}

const cameras = ["CHEMCAM_RMI", "NAVCAM_LEFT", "NAVCAM_RIGHT", "NAV_RIGHT_B", "FRONT_HAZCAM_RIGHT_A", "SUPERCAM_RMI"];
const rovers = ["curiosity", "perseverance"];

export const Filters = ({ rover, camera, earth_date, setFilters, clearFilters }: Props) => {
  const [localRover, setLocalRover] = React.useState(rover || "");
  const [localCamera, setLocalCamera] = React.useState(camera || "");
  const [localDate, setLocalDate] = React.useState<Date | null>(
    earth_date ? parse(earth_date, 'yyyy-MM-dd', new Date()) : null
  );

  const applyFilters = () => {
    setFilters({
      rover: localRover || undefined,
      camera: localCamera || undefined,
      earth_date: localDate ? format(localDate, 'yyyy-MM-dd') : undefined,
    });
  };

  const handleClearFilters = () => {
    setLocalRover("");
    setLocalCamera("");
    setLocalDate(null);
    clearFilters();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 6, justifyContent: "center", alignItems: "center" }}>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Rover</InputLabel>
          <Select
            value={localRover}
            onChange={(e) => setLocalRover(e.target.value)}
            sx={{ borderRadius: 3 }}
          >
            {rovers.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Camera</InputLabel>
          <Select
            value={localCamera}
            onChange={(e) => setLocalCamera(e.target.value)}
             sx={{ borderRadius: 3 }}
          >
            {cameras.map(c => <MenuItem key={c} value={c.toLowerCase()}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <DatePicker
          label="Earth Date"
          value={localDate}
          onChange={(newValue) => setLocalDate(newValue)}
          slotProps={{
            textField: {
              sx: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                },
                input: { color: "#fff" },
                label: { color: "#fff" }
              }
            }
          }}
        />

        <Button variant="contained" color="secondary" onClick={applyFilters}>
          Apply
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
          Clear
        </Button>
      </Box>
    </LocalizationProvider>
  );
};
