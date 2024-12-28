import Image from 'next/image'
import Link from 'next/link'

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

const GroupCard = ({
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
    <Link href={`/about/${id}`}>
      <Card className="overflow-hidden rounded-xl border-themeGray bg-themeBlack">
        <Image
          src={preview || `https://ucarecdn.com/${thumbnail}/`}
          alt="thumbnail"
          fill
          className="h-56 w-full opacity-70"
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

export default GroupCard
