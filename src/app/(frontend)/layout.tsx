import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from 'next'

import { Providers } from '@providers'

import { cn } from '@utils/cn'

import '@styles/globals.css'

import Head from 'next/head'

import { mergeOpenGraph } from '@seo/mergeOpenGraph'

import { InitTheme } from '@providers/Theme/InitTheme'
import { getServerSideURL } from '@utils/getURL'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <InitTheme />
        <link href="/assets/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/assets/favicon.svg" rel="icon" type="image/svg+xml" />
      </Head>
      <body className={cn(jakarta.className, 'antialiased bg-black')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph()
}
