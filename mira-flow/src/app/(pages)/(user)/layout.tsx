import { Inter } from 'next/font/google';
import Nav from './nav';

// Importar la fuente
const inter = Inter({ subsets: ['latin'] });

// Metadatos de la página
export const metadata = {
    title: 'holas geis',
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
            <body className={inter.className}>
                <Nav />
                {children}
            </body>
        </html>
    );
}
