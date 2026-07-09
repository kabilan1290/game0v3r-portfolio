import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
title: 'game0v3r - Portfolio',
description:
  'Senior security researcher with expertise in browser security, AI application security, and vulnerability research. 8+ years experience in information security spanning red teaming and product security.',
generator: 'game0v3r',
  icons: {
    icon: '/profile.jpeg',
    shortcut: '/profile.jpeg',
    apple: '/profile.jpeg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ background: '#000' }}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
