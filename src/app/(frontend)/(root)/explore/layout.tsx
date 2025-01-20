// import { onAuthenticatedUser } from "@/actions/auth"
import React from 'react'
import Link from 'next/link'

import { CategoryListSlider } from '@/app/(frontend)/(root)/(homepage)/Search/category-list-slider'

import BackdropGradient from '@components/global/backdrop-gradient'
import GradientText from '@components/global/gradient-text'
import Search from '@components/global/search'

const ExploreLayout = async ({ children }: { children: React.ReactNode }) => {
  // const user = await onAuthenticatedUser()
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-36 flex flex-col items-center px-10">
        <GradientText
          className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
          element="H2"
        >
          Piker Tattoos
        </GradientText>
        <p className="pt-2 leading-none text-themeTextGray">
          or{' '}
          <Link
            //  href={user.status === 200 ? `/group/create` : '/sign-in'}
            href="/"
            className="underline"
          >
            design your custom piece
          </Link>
        </p>
        <BackdropGradient
          className="h-3/6 w-4/12 md:w-5/12 xl:h-2/6 xl:w-3/12"
          container="items-center"
        >
          <Search
            placeholder="Search for anything"
            searchType="GROUPS"
            glass
            inputStyle="lg:w-[500px] text-lg h-auto z-[9999]"
            className="mb-3 mt-10 rounded-3xl border-themeGray px-5 py-2"
          />
          <div className="w-full md:w-[800px]">
            <CategoryListSlider overlay route />
          </div>
        </BackdropGradient>
      </div>
      {children}
    </div>
  )
}

export default ExploreLayout
