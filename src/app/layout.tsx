import type { Metadata } from "next";
import { Geist, Geist_Mono, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The departure-board face for the trip log. Share Tech Mono isn't a variable
// font, so `weight` is required — omit it and the build fails.
const departureBoard = Share_Tech_Mono({
  variable: "--font-departure",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Log & Fare Finder",
  description: "A flight log and fare finder web app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${departureBoard.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
