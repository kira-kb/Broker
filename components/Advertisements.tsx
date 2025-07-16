"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Static Ads Data
import ad1 from "@/app/assets/images/ad1.jpg";
import ad2 from "@/app/assets/images/ad2.jpg";
import ad3 from "@/app/assets/images/ad3.jpg";
import ad4 from "@/app/assets/images/ad4.jpg";
import Link from "next/link";

const ads = [
  {
    id: 1,
    src: ad1,
    title: "🔥 HOT DEAL",
    description: "Explore 50% discounts on premium listings",
    note: "Sponsored",
    link: "https://a2z-market.com/deal1",
  },
  {
    id: 2,
    src: ad2,
    title: "🏡 New Listing",
    description: "Modern apartments available now in Addis Ababa",
    note: "Verified",
    link: "https://a2z-market.com/listing/new",
  },
  {
    id: 3,
    src: ad3,
    title: "📢 Broker Ads",
    description: "List your property for free today!",
    note: "Ad",
    link: "https://a2z-market.com/post",
  },
  {
    id: 4,
    src: ad4,
    title: "🏡 New Listing",
    description: "Modern apartments available now in Addis Ababa",
    note: "Verified",
    link: "https://a2z-market.com/listing/new",
  },
];

export function Advertisements() {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false })
  );

  return (
    <div className="w-full py-6 flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-[1000px] aspect-[3/1] relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id}>
              <Link href={ad.link}>
                <Card className="rounded-xl overflow-hidden shadow-md">
                  <CardContent className="p-0 relative cursor-pointer group">
                    <Image
                      src={ad.src}
                      alt={ad.title}
                      width={900}
                      height={300}
                      priority
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-4 bg-white/80 backdrop-blur-sm rounded px-4 py-2 shadow-md">
                      <h4 className="text-sm font-semibold text-primary">
                        {ad.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {ad.description}
                      </p>
                      <span className="text-xs font-medium text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded-full">
                        {ad.note}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        {/* <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" /> */}
      </Carousel>
    </div>
  );
}

// ????????????????????????????????????????????????????
// ????????????????????????????????????????????????????
// "use client";

// import React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import ad1 from "@/app/assets/images/ad1.jpg";
// import ad2 from "@/app/assets/images/ad2.jpg";
// import ad3 from "@/app/assets/images/ad3.jpg";
// import ad4 from "@/app/assets/images/ad4.jpg";
// import Image from "next/image";

// const data = [
//   {
//     id: 1,
//     src: ad1.src,
//     title: "🔥 HOT DEAL",
//     description: "Explore 50% discounts on premium listings",
//     note: "Sponsored",
//     link: "https://a2z-market.com/deal1",
//   },
//   {
//     id: 2,
//     src: ad2.src,
//     title: "🏡 New Listing",
//     description: "Modern apartments available now in Addis Ababa",
//     note: "Verified",
//     link: "https://a2z-market.com/listing/new",
//   },
//   {
//     id: 3,
//     src: ad3.src,
//     title: "📢 Broker Ads",
//     description: "List your property for free today!",
//     note: "Ad",
//     link: "https://a2z-market.com/post",
//   },
//   {
//     id: 4,
//     src: ad4.src,
//     title: "🏡 New Listing",
//     description: "Modern apartments available now in Addis Ababa",
//     note: "Verified",
//     link: "https://a2z-market.com/listing/new",
//   },
// ];

// export function Advertisements() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 5000, stopOnInteraction: true })
//   );

//   return (
//     <Carousel
//       plugins={[plugin.current]}
//       className="w-full h-[300px]"
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent>
//         {data.map((d, i) => (
//           <CarouselItem key={i}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <Image
//                     src={d.src}
//                     alt={d.title}
//                     width={900}
//                     height={300}
//                     className="w-full h-full object-cover"
//                   />
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
