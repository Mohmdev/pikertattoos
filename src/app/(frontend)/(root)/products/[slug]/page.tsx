import { notFound } from 'next/navigation'
import React from 'react'

export default async function ProductRoute({
  params,
}: {
  params: { slug: string }
}) {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { slug } = params

  const product = {
    title: 'Product 1',
    description: 'Product 1 description',
    price: 100,
    image: 'https://via.placeholder.com/150',
  }

  if (!product) {
    return notFound()
  }

  return (
    // TODO: Add products archive page
    <div>page</div>
  )
}
