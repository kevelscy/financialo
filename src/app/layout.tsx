import { Geist, Geist_Mono } from 'next/font/google'
import { type Metadata } from 'next'

import { SEO_CONFIG } from '@/config/seo'

import { Toaster } from '@/ui/sonner'

import { QueryProvider } from '@/shared/lib/providers/query-client'
import { ThemeProvider } from '@/shared/lib/providers/theme'
import { AuthProvider } from '@/shared/lib/providers/auth'
import { Topbar } from '@/shared/components/top-bar'

import '@/shared/styles/index.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang='es' suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <QueryProvider>
            <ThemeProvider attribute='class' defaultTheme='ligth' disableTransitionOnChange>
              <Topbar />

              <main>{children}</main>

              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </AuthProvider>
  )
}