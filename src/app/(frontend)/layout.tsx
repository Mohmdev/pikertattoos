import { Plus_Jakarta_Sans } from 'next/font/google'

import '@styles/globals.css'

import Head from 'next/head'
import type { Metadata } from 'next'

import { Providers } from '@providers'

import { cn } from '@utils/cn'

// import { mergeOpenGraph } from '@seo/mergeOpenGraph'
// import { getServerSideURL } from '@utils/getURL'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link href="/assets/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/assets/vercel.svg" rel="icon" type="image/svg+xml" />
      </Head>
      <body className={cn(jakarta.className, 'antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  // metadataBase: new URL(getServerSideURL()),
  // openGraph: mergeOpenGraph()
  title: 'Piker Tattoos',
  description: 'Tattoo studio'
}
