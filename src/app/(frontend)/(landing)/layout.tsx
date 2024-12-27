import { Navbar } from '@components/layout/navbar'

type LandingLayoutProps = {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen pb-10 w-screen box-border">
      <Navbar />
      {children}
    </div>
  )
}

export default LandingLayout
