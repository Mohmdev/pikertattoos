import { Spinner } from '@ui/spinner'
import BackdropGradient from '@components/global/backdrop-gradient'
import GradientText from '@components/global/gradient-text'

export default function StudioPage() {
  // const user = await onAuthenticatedUser()
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col items-center mt-36 px-10">
        <GradientText className="text-[90px] font-semibold leading-none" element="H1">
          Piker Studio
        </GradientText>
        <span className="mt-10 relative text-themeTextGray leading-none pt-2 flex flex-row gap-2 items-center justify-center">
          <Spinner size="sm" className="bg-themeTextGray" />
          <p>Soon</p>
        </span>
        <BackdropGradient
          className="w-4/12 md:w-5/12 xl:w-3/12 xl:h-2/6 h-3/6 "
          container="items-center"
        >
          <div
            className="w-max max-w-full flex flex-col items-center overflow-x-hidden mt-28 relative"
            style={{
              maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0))`
            }}
          >
            <GradientText className="text-[50px] font-semibold leading-none" element="H2">
              Bia Bokhoresh
            </GradientText>
          </div>
        </BackdropGradient>
      </div>
    </div>
  )
}
