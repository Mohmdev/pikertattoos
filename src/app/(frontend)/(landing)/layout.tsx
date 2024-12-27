import { Navbar } from '@components/layout/navbar'

type LandingLayoutProps = {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black pb-10">
      <Navbar />
      {children}
    </div>
  )
}

export default LandingLayout
