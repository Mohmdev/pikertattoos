// import { getTattooMedia } from '@data/getTattooMedia'

// import configPromise from '@payload-config'

// import { getPayload } from 'payload'
// import { cn } from '@utils/cn'

// import BackdropGradient from '@components/global/backdrop-gradient'

// import { InViewImagesGrid } from '../(homepage)/InViewImagesGrid'

// export const dynamic = 'force-dynamic'

// export default async function StagingPage() {
//   // const user = await onAuthenticatedUser()
//   const payload = await getPayload({ config: configPromise })
//   const tattooImages = await getTattooMedia(payload)

//   return (
//     <div className="flex min-h-[100svh] flex-1 flex-col">
//       <div className="mt-36 flex flex-col items-center px-10">
//         <BackdropGradient
//           className="h-3/6 w-4/12 md:w-5/12 xl:h-2/6 xl:w-3/12"
//           container="items-center"
//         >
//           <div
//             className={cn(
//               'mb-36',
//               'relative flex w-max max-w-full flex-col items-center overflow-x-hidden'
//             )}
//             style={{
//               maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0))`
//             }}
//           >
//             <InViewImagesGrid images={tattooImages} />
//           </div>
//         </BackdropGradient>
//       </div>
//     </div>
//   )
// }
