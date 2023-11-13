import '@styles/globals.css';
import type { Metadata } from 'next'
import { Sora } from 'next/font/google';
import { Header, Footer, Slider } from '@components';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Meme Generator',
  description: 'Meme Generator by Jonathan Concepcion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={`page text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}>
          <Header />
          {children}
        </div>
          <Footer copyRightLabel='2023 Jonathan Concepcion. All Rights Reserved.'>

          </Footer>
      </body>
    </html>
  )
}
