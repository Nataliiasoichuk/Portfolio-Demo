import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nataliia Soichuk — UX/UI Designer Portfolio",
  description:
    "Portfolio of Nataliia Soichuk, junior UX/UI designer. Three study projects and the thinking behind them.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
