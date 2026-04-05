import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../../globals.css";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import defaultTheme from '@/app/lib/themes/defaultTheme';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export default function GameLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MantineProvider theme={defaultTheme}>
            {children}
        </MantineProvider>
    )
}