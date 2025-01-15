import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

interface HamburgerButtonProps {
  active: boolean
  setActive: (value: React.SetStateAction<boolean>) => void
  className?: string
  size?: number
}

export const HamburgerButton = ({
  active,
  setActive,
  className,
  size = 40
}: HamburgerButtonProps) => {
  const barWidth = size / 2
  const barHeight = size / 20
  const smallBarWidth = barWidth / 2

  return (
    <div className={cn(className)}>
      <motion.button
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={() => setActive((pv) => !pv)}
        className={cn(
          'group absolute right-3 top-2.5 z-50',
          'hover:bg-gradient-to-br bg-white/0 shadow-lg shadow-violet-800/20 transition-all',
          // 'border-2 border-red-600',
          active ? 'rounded-bl-md rounded-tr-md' : 'rounded-md'
        )}
        style={{
          width: size,
          height: size
        }}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block bg-white"
          style={{
            y: '-50%',
            left: '50%',
            x: '-50%',
            width: barWidth,
            height: barHeight
          }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block bg-white"
          style={{
            left: '50%',
            x: '-50%',
            top: '50%',
            y: '-50%',
            width: barWidth,
            height: barHeight
          }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block bg-white"
          style={{
            x: '-50%',
            y: '50%',
            width: smallBarWidth,
            height: barHeight
          }}
        />
      </motion.button>
    </div>
  )
}

// const UNDERLAY_VARIANTS = {
//   open: {
//     width: 'calc(100% - 32px)',
//     height: 'calc(100vh - 32px)',
//     transition: { type: 'spring', mass: 3, stiffness: 400, damping: 50 }
//   },
//   closed: {
//     width: '80px',
//     height: '80px',
//     transition: {
//       delay: 0.75,
//       type: 'spring',
//       mass: 3,
//       stiffness: 400,
//       damping: 50
//     }
//   }
// }

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%']
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%']
    }
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg']
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg']
    }
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%'
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 10px)'
    }
  }
}
