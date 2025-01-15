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
  size = 46
}: HamburgerButtonProps) => {
  const barWidth = size / 2
  const barHeight = size / 20
  const smallBarWidth = barWidth / 2
  const bottomBarOffset = (barWidth - smallBarWidth) / 2

  return (
    <div className={cn(className)}>
      <motion.button
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={() => setActive((pv) => !pv)}
        className={cn(
          'group absolute right-2.5 top-2 z-50',
          'hover:bg-gradient-to-br bg-white/0 shadow-lg transition-all duration-300 ease-out',
          // 'border-2 border-red-600',
          active ? 'rounded-bl-md rounded-tr-md shadow-violet-800/20' : 'rounded-md'
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block bg-white"
          style={{
            y: '-50%',
            left: '50%',
            x: '-50%',
            width: `${barWidth}px`,
            height: `${barHeight}px`
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
            width: `${barWidth}px`,
            height: `${barHeight}px`
          }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block bg-white"
          style={{
            x: `calc(-50% + ${bottomBarOffset}px - 1px)`,
            y: '50%',
            width: `${smallBarWidth}px`,
            height: `${barHeight}px`,
            left: '50%'
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
      top: ['35%', '50%', '50%'],
      width: ['50%', '50%', '50%'],
      x: '-50%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        rotate: { duration: 0.4, ease: 'easeInOut' },
        top: { duration: 0.3, ease: 'easeOut' }
      }
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
      width: '50%',
      x: '-50%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      width: ['25%', '50%', '50%'],
      opacity: 0,
      x: '-50%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        width: { duration: 0.3 }
      }
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      width: '25%',
      opacity: 0,
      x: 'calc(-50% + ${bottomBarOffset}px - 1px)',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }
}
