import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fitness Passport | Modern Gym Memberships",
    template: "%s | Fitness Passport",
  },
  description:
    "Fitness Passport helps you join a welcoming gym with flexible memberships, expert guidance, and a fast onboarding experience.",
  applicationName: "Fitness Passport",
  metadataBase: new URL("https://fitness-passport.example"),
  openGraph: {
    title: "Fitness Passport | Modern Gym Memberships",
    description:
      "Join a welcoming gym with flexible memberships, expert guidance, and a fast onboarding experience.",
    url: "/",
    siteName: "Fitness Passport",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Passport | Modern Gym Memberships",
    description:
      "Join a welcoming gym with flexible memberships, expert guidance, and a fast onboarding experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
