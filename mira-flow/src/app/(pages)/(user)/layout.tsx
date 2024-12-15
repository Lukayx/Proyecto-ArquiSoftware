import { Inter } from 'next/font/google';
import Nav from './nav';

// Cargar la fuente con display: 'swap'
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// Metadatos de la página
export const metadata = {
  title: 'Miraflow',
  description: 'luciano uwu, hola ',
};

// Definir las propiedades del componente
interface RootLayoutProps {
  children: React.ReactNode; // Especificar el tipo de 'children'
}

// Componente de Layout
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags y otros enlaces necesarios */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="title" content={metadata.title} />
      </head>
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
