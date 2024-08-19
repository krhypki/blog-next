"use client";

import { MediaQueryContextProvider } from "@/contexts/MediaQueryContextProvider";
import { ThemeProvider } from "next-themes";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MediaQueryContextProvider>{children}</MediaQueryContextProvider>
    </ThemeProvider>
  );
}
