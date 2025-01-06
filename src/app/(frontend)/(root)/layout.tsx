import { Navbar } from '@components/layout/navbar'

type GlobalLayoutProps = {
  children: React.ReactNode
}

export default async function GlobalLayout({ children }: GlobalLayoutProps) {
  // const { isEnabled: draft } = await draftMode()
  // const getGlobals = draft
  //   ? fetchGlobals
  //   : unstable_cache(fetchGlobals, ['globals', 'mainMenu', 'footer'])

  // const {
  //   mainMenu
  //   //  footer
  // } = await getGlobals()

  return (
    <div className="box-border flex min-h-screen w-screen flex-col pb-10">
      <Navbar
      //  mainMenu={mainMenu}
      />
      {children}
    </div>
  )
}
