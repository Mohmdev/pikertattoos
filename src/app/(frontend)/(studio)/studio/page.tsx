import { cn } from '@utils/cn'

import { BackdropGradient } from '@components/global/backdrop-gradient'
import GradientText from '@components/global/gradient-text'
import { Spinner } from '@ui/spinner'

export default function StudioPage() {
  // const user = await onAuthenticatedUser()
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-36 flex flex-col items-center px-10">
        <GradientText
          className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
          element="H1"
        >
          Piker Studio
        </GradientText>
        <span className="relative mt-10 flex flex-row items-center justify-center gap-2 pt-2 leading-none text-themeTextGray">
          <Spinner size="sm" className="bg-themeTextGray" />
          <p>Soon</p>
        </span>
        <BackdropGradient>
          <div
            className={cn(
              'mb-36',
              'relative flex w-max max-w-full flex-col items-center overflow-x-hidden'
            )}
            style={{
              maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0))`
            }}
          >
            <GradientText
              className="text-[35px] font-semibold leading-none opacity-50 md:text-[50px]"
              element="H2"
            >
              Bia Bokhoresh
            </GradientText>
          </div>
        </BackdropGradient>
      </div>
    </div>
  )
}
