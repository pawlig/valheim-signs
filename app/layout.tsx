import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Runopis — editor cedulí pro Valheim',
  description:
    'Vytvoř si vlastní ceduli do Valheimu. Barvy, velikost, rich text značky, živý náhled a kopírování do hry.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className="dark">
      <body>{children}</body>
    </html>
  );
}
