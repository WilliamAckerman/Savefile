import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { createTheme, ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core'
import defaultTheme from '@/app/lib/themes/defaultTheme'

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
        <MantineProvider theme={defaultTheme}>
          <Header />
          <main className="bg-slate-900 p-6 text-white">
            {children}
          </main>
          <Footer />
        </MantineProvider>
    </>
  );
}