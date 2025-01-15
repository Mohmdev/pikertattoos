import { cn } from '@utils/cn'

type Props = {
  children: React.ReactNode
  className?: string
  blurClassName?: string
}

const BackdropGradient = ({ children, className, blurClassName }: Props) => {
  return (
    <div className={cn('relative flex w-full flex-col', className)}>
      <div className={cn('radial--blur absolute mx-10 rounded-[50%]', blurClassName)} />
      {children}
    </div>
  )
}

export default BackdropGradient
