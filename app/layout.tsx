import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecomz - Sıfır Sermaye E-Ticaret',
  description: 'E-ticarete dair tüm araçlar ve dersler tek bir yerde. Ecomz sınırlı sayıda koltuk içeriyor ve kontenjan doldukça fiyatlar artacak.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

