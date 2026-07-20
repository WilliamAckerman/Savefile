import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { createTheme, ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core'
import defaultTheme from '@/app/lib/themes/defaultTheme'

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: {
    template: '%s | SaveFile', // The %s is replaced by the specific page title
    default: 'SaveFile',
  },
  description: "SaveFile is a web application aiming to improve upon user experience of IGDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <ThemeProvider attribute="data-theme">
          <Header />
          <main className="bg-primaryBg text-primaryText motion-reduce:transition-none ease-in-out duration-300"> {/* Formerly had bg-slate-900 and p-6 classes */}
            {children}
          </main>
          <Footer />
        </ThemeProvider>
    </>
  );
}