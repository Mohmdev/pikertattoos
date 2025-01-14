import { cn } from '@utils/cn'

import { Spotlight } from './spotlight'
import { Tilt } from './tilt'

type TiltSpotlightProps = {
  children: React.ReactNode
  className?: string
  disableTilt?: boolean
}

export function TiltSpotlight({ children, className, disableTilt }: TiltSpotlightProps) {
  const Wrapper = disableTilt ? 'div' : Tilt
  const tiltProps = disableTilt
    ? { className: 'group relative rounded-lg' }
    : {
        rotationFactor: 6,
        isRevese: true,
        style: {
          transformOrigin: 'center center'
        },
        springOptions: {
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2
        },
        className: 'group relative rounded-lg'
      }

  return (
    <div className={cn(className)}>
      <Wrapper {...tiltProps}>
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2
          }}
        />

        {children}
      </Wrapper>
    </div>
  )
}
