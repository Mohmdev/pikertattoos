import { motion } from 'motion/react'
import { cn } from '@utils/cn'

import { Spotlight } from './spotlight'
import { Tilt } from './tilt'

type TiltSpotlightProps = {
  children: React.ReactNode
  className?: string
}
export function TiltSpotlight({ children, className }: TiltSpotlightProps) {
  return (
    <div className={cn('aspect-video max-w-sm', className)}>
      <Tilt
        rotationFactor={6}
        isRevese
        style={{
          transformOrigin: 'center center'
        }}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2
        }}
        className="group relative rounded-lg"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2
          }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            visible: {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }
          }}
          className={cn('relative overflow-hidden rounded-sm')}
        >
          {children}
        </motion.div>
      </Tilt>
    </div>
  )
}
