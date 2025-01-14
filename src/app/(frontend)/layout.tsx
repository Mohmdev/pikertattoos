import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from 'next'

import { Providers } from '@providers'
import { getDynamicMeta } from '@seo/getDynamicMeta'
import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { cn } from '@utils/cn'
import { getServerSideURL } from '@utils/getURL'

import '@styles/globals.css'
import '@styles/scss/app.scss'

// import Favicon from '@services/admin/Favicon'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* <Favicon /> */}</head>
      <body className={cn(jakarta.className, 'antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, siteDescription, favicon } = await getDynamicMeta()

  return {
    metadataBase: new URL(getServerSideURL()),
    title: siteName,
    description: siteDescription,
    icons: favicon ? [{ rel: 'icon', url: favicon.url }] : undefined,
    openGraph: mergeOpenGraph(undefined, {
      siteName,
      description: siteDescription
    })
  }
}
