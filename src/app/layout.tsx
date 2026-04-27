import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import IntroOverlay from './components/effects/IntroOverlay';
import CustomCursor from './components/effects/CustomCursor';
import Header from './components/effects/Header';
import MainCanvas from './components/scene/MainCanvas';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'T4S Group® · Strategic by Design, Systemic by Code',
  description:
    'T4S Group costruisce l’infrastruttura digitale delle imprese svizzere. Cloud, AI, sicurezza e dati — un solo team senior, output verificabili.',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="bg-bg text-white/70 font-sans relative">
        <IntroOverlay />
        <CustomCursor />
        <MainCanvas />
        <Header />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
