import { Navbar } from '@components/layout/navbar'

type GlobalLayoutProps = {
  children: React.ReactNode
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className="box-border flex min-h-screen w-screen flex-col pb-10">
      <Navbar />
      {children}
    </div>
  )
}
