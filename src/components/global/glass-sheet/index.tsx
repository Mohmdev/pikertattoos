import { cn } from '@utils/cn'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@ui/sheet'

type GlassSheetProps = {
  children: React.ReactNode
  trigger: React.ReactNode
  className?: string
  triggerClass?: string
}

const GlassSheet = ({ children, trigger, className, triggerClass }: GlassSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(triggerClass)} asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent
        className={cn(
          'bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bg-opacity-20 bg-themeGray border-themeGray',
          className
        )}
      >
        <SheetTitle className="hidden">title</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default GlassSheet
