"use client";
import { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "../styles/globals.css";
import { theme } from "@/theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <main style={{ padding: "20px", backgroundColor: "#000", minHeight: "80vh" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
