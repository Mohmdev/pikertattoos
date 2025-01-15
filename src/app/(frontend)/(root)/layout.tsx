import React from 'react'

type GlobalLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function GlobalLayout({ children, modal }: GlobalLayoutProps) {
  return (
    <div className="box-border flex min-h-screen w-screen flex-col pb-10">
      {modal}
      {children}
    </div>
  )
}
