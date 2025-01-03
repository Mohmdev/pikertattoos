import { Plus_Jakarta_Sans } from 'next/font/google'
import Head from 'next/head'
import type { Metadata } from 'next'

import { Providers } from '@providers'
import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { cn } from '@utils/cn'
import { getServerSideURL } from '@utils/getURL'

import '@styles/globals.css'
import '@styles/scss/app.scss'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
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
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: 'Piker Tattoos Studio',
  description:
    'Piker Studio, where artistry meets skin! We transform your ideas, blend them with creativity and precision and we create tattoos that tell your unique story.'
}
