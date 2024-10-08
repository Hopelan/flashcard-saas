import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Inter  } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
          >
          <Toaster/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
