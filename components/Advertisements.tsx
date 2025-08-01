"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useBrokerStore } from "@/state/state";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function Advertisements() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const { ads } = useBrokerStore();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Track current slide
  useEffect(() => {
    if (!api) return () => {};

    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());

    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-6">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl group"
        setApi={setApi}
      >
        <CarouselContent className="p-0">
          {ads.map((ad) => (
            <CarouselItem key={ad.id} className="p-0">
              <Card className="p-0 overflow-hidden border-none rounded-2xl shadow-md">
                <CardContent className="p-0 relative aspect-video md:aspect-[3/1]">
                  <Image
                    src={ad.src}
                    alt={ad.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 z-20 p-4 md:p-8 text-white max-w-full">
                    <span className="px-3 py-1 text-xs font-semibold text-black bg-yellow-400 rounded-full">
                      {ad.note}
                    </span>
                    <h3 className="mt-2 text-xl md:text-4xl font-bold">
                      {ad.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base max-w-xl">
                      {ad.description}
                    </p>
                    <Link href={ad.link} passHref>
                      <Button className="mt-4" variant="secondary">
                        {ad.cta}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4" />
        <CarouselNext className="right-2 md:right-4" />
      </Carousel>

      {/* Animated Dots - only visible on md and up */}
      {/* <div className="hidden md:flex justify-center mt-4 space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 ease-in-out transform",
              current === index
                ? "bg-yellow-400 scale-125 shadow-md"
                : "bg-gray-300 scale-100"
            )}
          />
        ))}
      </div> */}
      <div className="hidden md:flex justify-center mt-4 space-x-2 overflow-x-auto px-2 overflow-y-hidden">
        {ads.map((ad, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "relative w-20 h-12 rounded overflow-hidden border-2 transition-all duration-300",
              current === index
                ? "border-blue-800 scale-110 shadow-md border-2"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={ad.src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????
// "use client";

// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useBrokerStore } from "@/state/state";

// export function Advertisements() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 5000, stopOnInteraction: true })
//   );
//   const { ads } = useBrokerStore();

//   return (
//     <div className="flex justify-center w-full px-2 md:px-6">
//       <Carousel plugins={[plugin.current]} className="w-full max-w-6xl group">
//         <CarouselContent className="p-0">
//           {ads.map((ad) => (
//             <CarouselItem key={ad.id} className="p-0">
//               <Card className="p-0 overflow-hidden border-none rounded-2xl shadow-md">
//                 <CardContent className="p-0 relative aspect-video md:aspect-[3/1]">
//                   <Image
//                     src={ad.src}
//                     alt={ad.title}
//                     fill
//                     className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
//                     priority
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
//                   <div className="absolute bottom-0 left-0 z-20 p-4 md:p-8 text-white max-w-full">
//                     <span className="px-3 py-1 text-xs font-semibold text-black bg-yellow-400 rounded-full">
//                       {ad.note}
//                     </span>
//                     <h3 className="mt-2 text-xl md:text-4xl font-bold">
//                       {ad.title}
//                     </h3>
//                     <p className="mt-2 text-sm md:text-base max-w-xl">
//                       {ad.description}
//                     </p>
//                     <Link href={ad.link} passHref>
//                       <Button className="mt-4" variant="secondary">
//                         {ad.cta}
//                       </Button>
//                     </Link>
//                   </div>
//                 </CardContent>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="left-2 md:left-4" />
//         <CarouselNext className="right-2 md:right-4" />
//       </Carousel>
//     </div>
//   );
// }

// ????????????????????????????????????????????????????????
// "use client";

// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn/ui
// import { useBrokerStore } from "@/state/state";

// export function Advertisements() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 5000, stopOnInteraction: true })
//   );

//   const { ads } = useBrokerStore();

//   return (
//     <div className="flex justify-center w-full">
//       <Carousel
//         plugins={[plugin.current]}
//         className="w-full max-w-6xl"
//         // onMouseEnter={plugin.current.stop}
//         // onMouseLeave={plugin.current.reset}
//       >
//         <CarouselContent className="p-0">
//           {ads.map((ad) => (
//             <CarouselItem key={ad.id} className="p-0">
//               <Card className="p-0 overflow-hidden border-none rounded-2xl">
//                 <CardContent className="p-0 relative aspect-video md:aspect-[3/1]">
//                   <Image
//                     src={ad.src}
//                     alt={ad.title}
//                     // layout="fill"
//                     objectFit="cover"
//                     className="transition-transform duration-500 ease-in-out group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                   <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
//                     <span className="px-3 py-1 text-xs font-semibold text-black bg-yellow-400 rounded-full">
//                       {ad.note}
//                     </span>
//                     <h3 className="mt-2 text-2xl font-bold md:text-4xl">
//                       {ad.title}
//                     </h3>
//                     <p className="max-w-lg mt-2 text-sm md:text-base">
//                       {ad.description}
//                     </p>
//                     <Link href={ad.link} passHref>
//                       <Button className="mt-4" variant="secondary">
//                         {ad.cta}
//                       </Button>
//                     </Link>
//                   </div>
//                 </CardContent>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="left-4" />
//         <CarouselNext className="right-4" />
//       </Carousel>
//     </div>
//   );
// }

// ???????????????????????????????????????????????????
// "use client";

// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";

// // Static Ads Data
// import ad1 from "@/app/assets/images/ad1.jpg";
// import ad2 from "@/app/assets/images/ad2.jpg";
// import ad3 from "@/app/assets/images/ad3.jpg";
// import ad4 from "@/app/assets/images/ad4.jpg";
// import Link from "next/link";

// const ads = [
//   {
//     id: 1,
//     src: ad1,
//     title: "🔥 HOT DEAL",
//     description: "Explore 50% discounts on premium listings",
//     note: "Sponsored",
//     link: "https://a2z-market.com/deal1",
//   },
//   {
//     id: 2,
//     src: ad2,
//     title: "🏡 New Listing",
//     description: "Modern apartments available now in Addis Ababa",
//     note: "Verified",
//     link: "https://a2z-market.com/listing/new",
//   },
//   {
//     id: 3,
//     src: ad3,
//     title: "📢 Broker Ads",
//     description: "List your property for free today!",
//     note: "Ad",
//     link: "https://a2z-market.com/post",
//   },
//   {
//     id: 4,
//     src: ad4,
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
//     <div className="flex justify-center w-full p-0">
//       <Carousel
//         plugins={[plugin.current]}
//         // orientation="vertical"
//         className="w-full max-w-[1000px] aspect-[3/1] relative"
//         // onMouseEnter={plugin.current.stop}
//         // onMouseLeave={plugin.current.reset}
//         // onMouseOut={plugin.current.reset}
//       >
//         <CarouselContent className="p-0 shadow-2xl shadow-gray-400">
//           {ads.map((ad) => (
//             <CarouselItem key={ad.id}>
//               <Link href={ad.link}>
//                 <Card className="p-0 overflow-hidden shadow-md rounded-xl">
//                   <CardContent className="relative p-0 cursor-pointer group">
//                     <Image
//                       src={ad.src}
//                       alt={ad.title}
//                       width={900}
//                       height={300}
//                       priority
//                       className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
//                     />
//                     <div className="absolute px-4 py-2 rounded shadow-md bottom-3 left-4 bg-white/80 backdrop-blur-sm">
//                       <h4 className="text-sm font-semibold text-primary">
//                         {ad.title}
//                       </h4>
//                       <p className="text-xs text-muted-foreground">
//                         {ad.description}
//                       </p>
//                       <span className="text-xs font-medium text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded-full">
//                         {ad.note}
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//         {/* <CarouselPrevious className="absolute -translate-y-1/2 left-2 top-1/2" />
//         <CarouselNext className="absolute -translate-y-1/2 right-2 top-1/2" /> */}
//       </Carousel>
//     </div>
//   );
// }
