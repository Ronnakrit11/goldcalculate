import { Inter, DM_Sans, Instrument_Serif, IBM_Plex_Sans_Thai, Prompt } from "next/font/google";
import localFont from "next/font/local";

export const heading = localFont({
    src: [
        {
            path: '../../public/fonts/Satoshi-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Medium.woff2', 
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Bold.woff2',
            weight: '700', 
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Black.woff2',
            weight: '900',
            style: 'normal',
        }
    ],
    variable: '--font-heading'
});

export const base = Inter({
    subsets: ["latin"],
    variable: "--font-base",
});

export const subheading = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-subheading",
});

export const thai = IBM_Plex_Sans_Thai({
    weight: ['400'],
    subsets: ['thai'],
    variable: '--font-thai',
});

export const prompt = Prompt({
    weight: ['400', '500', '600', '700'],
    subsets: ['thai', 'latin'],
    variable: '--font-prompt',
    display: 'swap',
});