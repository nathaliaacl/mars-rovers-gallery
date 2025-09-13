"use client";
import React from "react";
import { usePhotos } from "../hooks/usePhotos";
import { Filters } from "../components/Filters";
import { MasonryLayout } from "../components/MasonryLayout";
import { Pagination, CircularProgress, Box, Typography } from "@mui/material";

export default function HomePage() {
  const {
    photos,
    loading,
    error,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    clearFilters,
  } = usePhotos();

  return (
    <div style={{ padding: "50px" }}>
      <Filters {...filters} setFilters={setFilters} clearFilters={clearFilters} />

      {loading ? (
        <Box sx={{ display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",}}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : photos.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: "1.2rem" }}>
            No photo found.
          </Typography>
        </Box>
      ) : (
        <MasonryLayout photos={photos} />
      )}

      {photos.length > 0 && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ color: "#fff" }}
          />
        </Box>
      )}
    </div>
  );
}
