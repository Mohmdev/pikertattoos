import { useTheme } from 'next-themes'
import { cn } from '@utils/cn'

import { LineShadowText } from '@ui/line-shadow-text'

interface LineShadowTitleProps {
  text?: string
  highlightedText?: string
  className?: string
}

export function LineShadowTitle({
  text = 'Nexweb',
  highlightedText = 'Studio',
  className
}: LineShadowTitleProps) {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === 'dark' ? 'white' : 'black'

  return (
    <div
      className={cn('relative flex w-max flex-col items-center overflow-visible px-4')}
      style={{
        maskImage: `radial-gradient(circle at center, 
          rgba(255, 255, 255, 1) 0%, 
          rgba(255, 255, 255, 0.8) 30%,
          rgba(255, 255, 255, 0.4) 70%, 
          rgba(255, 255, 255, 0.1) 100%)`
      }}
    >
      <h1
        className={cn(
          'text-balance',
          'text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl',
          className
        )}
      >
        {text}
        <LineShadowText className="italic" shadowColor={shadowColor}>
          {highlightedText}
        </LineShadowText>
      </h1>
    </div>
  )
}
