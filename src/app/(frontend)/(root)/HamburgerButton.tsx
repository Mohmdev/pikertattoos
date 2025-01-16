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
  size = 30
}: HamburgerButtonProps) => {
  return (
    <motion.button
      initial={false}
      animate={active ? 'open' : 'closed'}
      onClick={() => setActive((pv) => !pv)}
      className={cn(
        'group absolute right-3.5 top-3 z-50',
        'bg-white/0 transition-all duration-300 ease-out',
        active
          ? 'before:absolute before:inset-0 before:rounded-lg before:shadow-lg before:shadow-violet-800/20'
          : 'rounded-md',
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <motion.span
        variants={HAMBURGER_VARIANTS.top}
        className="absolute block h-[2px] rounded-full bg-white"
        style={{
          top: '50%',
          y: '0',
          left: '50%',
          x: '-50%',
          width: `70%`
        }}
      />
      <motion.span
        variants={HAMBURGER_VARIANTS.middle}
        className="absolute block h-[2px] rounded-full bg-white"
        style={{
          left: '50%',
          x: '-50%',
          top: '60%',
          width: `70%`
        }}
      />
    </motion.button>
  )
}

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '35%', '50%'],
      width: ['50%', '25%', '50%'],
      x: '-50%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        rotate: { duration: 0.4, ease: 'easeInOut' },
        top: { duration: 0.3, ease: 'easeOut' },
        width: { duration: 0.3, ease: 'easeOut' }
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
      top: '50%',
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
  }
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
