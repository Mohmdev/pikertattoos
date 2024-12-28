import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@utils/cn'
import { truncateString } from '@utils/truncateString'

import { Card } from '@ui/card'

type Props = {
  id: string
  name: string
  category: string
  createdAt: Date
  userId: string
  thumbnail: string | null
  description: string | null
  privacy: 'PUBLIC' | 'PRIVATE'
  preview?: string
}

export const ItemCard = ({
  id,
  // userId,
  thumbnail,
  name,
  // category,
  description,
  // privacy,
  preview
}: Props) => {
  return (
    <Link href={`/about/${id}`} className="flex w-max">
      <Card
        className={cn(
          'h-64',
          //
          'overflow-hidden rounded-xl border-themeGray bg-themeBlack'
        )}
      >
        <Image
          fill
          alt="thumbnail"
          className="w-full opacity-70"
          src={preview || `https://ucarecdn.com/${thumbnail}/`}
        />
        <div className="p-6">
          <h3 className="text-lg font-bold text-themeTextGray">{name}</h3>
          <p className="text-base text-themeTextGray">
            {description && truncateString(description)}
          </p>
        </div>
      </Card>
    </Link>
  )
}
