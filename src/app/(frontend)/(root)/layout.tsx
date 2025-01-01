import { Navbar } from '@components/layout/navbar'

type LandingLayoutProps = {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="box-border flex min-h-screen w-screen flex-col pb-10">
      <Navbar />
      {children}
    </div>
  )
}

export default LandingLayout
