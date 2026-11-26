import { Inter, Space_Grotesk } from "next/font/google";

// Shared by the site layout and Storybook, so both load the same fonts.
// Inter has a Cyrillic subset; Space Grotesk does not, so it stays Latin only.
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

export const fontVariables = `${inter.variable} ${spaceGrotesk.variable}`;
