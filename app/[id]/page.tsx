"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel"; // Import the Carousel API type
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { MapPin, Phone, MessageCircle, Tag, Calendar } from "lucide-react";

// Assuming your image imports are correct for your project structure
import img1 from "@/app/assets/images/image1.png";
import img2 from "@/app/assets/images/image2.png";
import img3 from "@/app/assets/images/image3.png";

const dummyData = {
  id: "1",
  title: "Modern 2-Bedroom Apartment",
  rentPrice: "4500 ETB/month",
  sellPrice: "4,987,500 ETB",
  status: "Available",
  location: "Bole, Addis Ababa",
  postedDate: "July 14, 2025",
  contactPhone: "+251912345678",
  contactTelegram: "@a2zmarket",
  description:
    "This modern apartment offers 2 bedrooms, a spacious living area, and a fully equipped kitchen. Located in a quiet neighborhood with easy access to transportation and shopping.",
  images: [img1.src, img2.src, img3.src],
};

export default function DetailsPage() {
  // Correctly type the state for the carousel API
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const data = dummyData;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      // Use the API's method to get the current snap index
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Explicitly type the index parameter
  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    // Use semantic background color for theme compatibility
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Card uses semantic colors for its background and border by default */}
        <Card className="overflow-hidden border shadow-lg rounded-2xl">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Gallery */}
              <div className="flex flex-col">
                <Carousel
                  setApi={setApi} // The setApi prop now matches the typed state setter
                  plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                  className="w-full"
                >
                  <CarouselContent>
                    {data.images.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="relative h-80 md:h-[500px] cursor-zoom-in"
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <Image
                              src={src}
                              alt={`Apartment view ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                          </DialogTrigger>
                          <DialogContent className="w-full max-w-4xl p-0 bg-transparent border-none">
                            {/* Use sr-only class for accessibility instead of VisuallyHidden component */}
                            <DialogTitle className="sr-only">
                              {data.title}
                            </DialogTitle>
                            <Image
                              src={src}
                              alt={`Enlarged apartment view ${index + 1}`}
                              width={1200}
                              height={800}
                              className="object-contain w-full h-full rounded-lg"
                            />
                          </DialogContent>
                        </Dialog>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute -translate-y-1/2 left-4 top-1/2" />
                  <CarouselNext className="absolute -translate-y-1/2 right-4 top-1/2" />
                </Carousel>
                {/* Thumbnails with theme-aware background */}
                <div className="flex justify-center gap-2 p-4 bg-muted/50">
                  {data.images.map((src, index) => (
                    <button
                      key={`thumb-${index}`}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                        index === current
                          ? "border-primary scale-110"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className="flex flex-col p-8 space-y-6">
                <div>
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl font-bold text-foreground">
                      {data.title}
                    </h1>
                    <Badge
                      variant={
                        data.status === "Available" ? "default" : "destructive"
                      }
                      className="text-sm shrink-0"
                    >
                      {data.status}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>Posted on {data.postedDate}</span>
                  </div>
                </div>

                <p className="text-base text-muted-foreground">
                  {data.description}
                </p>

                <Separator />

                {/* Key Details */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground">{data.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Tag className="w-6 h-6 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Price Options
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <p className="text-xl font-bold text-green-600">
                          {data.rentPrice}
                        </p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {data.sellPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information and Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Contact Information
                  </h3>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <p className="text-foreground">{data.contactPhone}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    <p className="text-foreground">{data.contactTelegram}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Button asChild size="lg" className="flex-1">
                    <a href={`tel:${data.contactPhone}`}>
                      <Phone className="w-5 h-5 mr-2" /> Call Now
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="flex-1"
                  >
                    <a
                      href={`https://t.me/${data.contactTelegram.substring(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" /> Send a Message
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????????????????????????????
// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import Autoplay from "embla-carousel-autoplay";
// import { MapPin, Phone, MessageCircle, Tag, Calendar } from "lucide-react";

// import img1 from "@/app/assets/images/image1.png";
// import img2 from "@/app/assets/images/image2.png";
// import img3 from "@/app/assets/images/image3.png";

// const dummyData = {
//   id: "1",
//   title: "Modern 2-Bedroom Apartment",
//   rentPrice: "4500 ETB/month",
//   sellPrice: "4,987,500 ETB",
//   status: "Available",
//   location: "Bole, Addis Ababa",
//   postedDate: "July 14, 2025",
//   contactPhone: "+251912345678",
//   contactTelegram: "@a2zmarket",
//   description:
//     "This modern apartment offers 2 bedrooms, a spacious living area, and a fully equipped kitchen. Located in a quiet neighborhood with easy access to transportation and shopping.",
//   images: [img1.src, img2.src, img3.src],
// };

// export default function DetailsPage() {
//   const [api, setApi] = useState(null);
//   const [current, setCurrent] = useState(0);

//   const data = dummyData;

//   useEffect(() => {
//     if (!api) {
//       return;
//     }

//     setCurrent(api.selectedScrollSnap());

//     const handleSelect = () => {
//       setCurrent(api.selectedScrollSnap());
//     };

//     api.on("select", handleSelect);

//     return () => {
//       api.off("select", handleSelect);
//     };
//   }, [api]);

//   const handleThumbnailClick = (index) => {
//     if (api) {
//       api.scrollTo(index);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
//         <Card className="overflow-hidden border-none shadow-lg rounded-2xl">
//           <CardContent className="p-0">
//             <div className="grid grid-cols-1 md:grid-cols-2">
//               {/* Image Gallery */}
//               <div className="relative">
//                 <Carousel
//                   setApi={setApi}
//                   plugins={[Autoplay({ delay: 5000 })]}
//                   className="w-full"
//                 >
//                   <CarouselContent>
//                     {data.images.map((src, index) => (
//                       <CarouselItem
//                         key={index}
//                         className="relative h-80 md:h-[500px] cursor-zoom-in"
//                       >
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Image
//                               src={src}
//                               alt={`Ad Image ${index + 1}`}
//                               fill
//                               className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
//                             />
//                           </DialogTrigger>
//                           <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
//                             <VisuallyHidden>
//                               <DialogTitle>{data.title}</DialogTitle>
//                             </VisuallyHidden>
//                             <Image
//                               src={src}
//                               alt="Full Image"
//                               width={1200}
//                               height={800}
//                               className="object-contain w-full h-full rounded-lg"
//                             />
//                           </DialogContent>
//                         </Dialog>
//                       </CarouselItem>
//                     ))}
//                   </CarouselContent>
//                   <CarouselPrevious className="absolute -translate-y-1/2 left-4 top-1/2" />
//                   <CarouselNext className="absolute -translate-y-1/2 right-4 top-1/2" />
//                 </Carousel>
//                 {/* Thumbnails */}
//                 <div className="flex justify-center gap-2 p-4 bg-gray-100">
//                   {data.images.map((src, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleThumbnailClick(index)}
//                       className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-transform duration-200 ${
//                         index === current
//                           ? "border-blue-500 scale-110"
//                           : "border-transparent"
//                       }`}
//                     >
//                       <Image
//                         src={src}
//                         alt={`Thumbnail ${index + 1}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Details Section */}
//               <div className="flex flex-col p-8 space-y-6">
//                 <div>
//                   <div className="flex items-start justify-between">
//                     <h1 className="text-3xl font-bold text-gray-800">
//                       {data.title}
//                     </h1>
//                     <Badge
//                       variant={
//                         data.status === "Available" ? "default" : "destructive"
//                       }
//                       className="text-sm"
//                     >
//                       {data.status}
//                     </Badge>
//                   </div>
//                   <div className="flex items-center mt-2 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 mr-1.5" />
//                     <span>Posted on {data.postedDate}</span>
//                   </div>
//                 </div>

//                 <p className="text-base text-gray-600">{data.description}</p>

//                 <Separator />

//                 {/* Key Details */}
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <MapPin className="w-6 h-6 mt-1 text-gray-500" />
//                     <div>
//                       <p className="font-semibold text-gray-700">Location</p>
//                       <p className="text-gray-600">{data.location}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <Tag className="w-6 h-6 mt-1 text-gray-500" />
//                     <div>
//                       <p className="font-semibold text-gray-700">
//                         Price Options
//                       </p>
//                       <div className="flex flex-wrap gap-x-4 gap-y-2">
//                         <p className="text-xl font-bold text-green-600">
//                           {data.rentPrice}
//                         </p>
//                         <p className="text-xl font-bold text-blue-600">
//                           {data.sellPrice}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <Separator />

//                 {/* Contact Information and Actions */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Contact Information
//                   </h3>
//                   <div className="flex items-center space-x-3">
//                     <Phone className="w-5 h-5 text-gray-500" />
//                     <p className="text-gray-600">{data.contactPhone}</p>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-500" />
//                     <p className="text-gray-600">{data.contactTelegram}</p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Button size="lg" className="flex-1">
//                     <Phone className="w-5 h-5 mr-2" /> Call Now
//                   </Button>
//                   <Button size="lg" variant="outline" className="flex-1">
//                     <MessageCircle className="w-5 h-5 mr-2" /> Send a Message
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// ?????????????????????????????????????????????????????????????????????????????????????
// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import Autoplay from "embla-carousel-autoplay";
// import { MapPin, Phone, MessageCircle, Tag, Calendar } from "lucide-react";

// import img1 from "@/app/assets/images/image1.png";
// import img2 from "@/app/assets/images/image2.png";
// import img3 from "@/app/assets/images/image3.png";

// const dummyData = {
//   id: "1",
//   title: "Modern 2-Bedroom Apartment",
//   rentPrice: "4500 ETB/month",
//   sellPrice: "4,987,500 ETB",
//   status: "Available",
//   location: "Bole, Addis Ababa",
//   postedDate: "July 14, 2025",
//   contactPhone: "+251912345678",
//   contactTelegram: "@a2zmarket",
//   description:
//     "This modern apartment offers 2 bedrooms, a spacious living area, and a fully equipped kitchen. Located in a quiet neighborhood with easy access to transportation and shopping.",
//   images: [img1.src, img2.src, img3.src],
// };

// export default function DetailsPage() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const data = dummyData;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
//         <Card className="overflow-hidden border-none shadow-lg rounded-2xl">
//           <CardContent className="p-0">
//             <div className="grid grid-cols-1 md:grid-cols-2">
//               {/* Image Gallery */}
//               <div className="relative">
//                 <Carousel
//                   plugins={[Autoplay({ delay: 4000 })]}
//                   className="w-full"
//                 >
//                   <CarouselContent>
//                     {data.images.map((src, index) => (
//                       <CarouselItem
//                         key={index}
//                         className="relative h-80 md:h-[500px] cursor-zoom-in"
//                       >
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Image
//                               src={src}
//                               alt={`Ad Image ${index + 1}`}
//                               fill
//                               className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
//                               onClick={() => setSelectedImage(src)}
//                             />
//                           </DialogTrigger>
//                           <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
//                             <Image
//                               src={src}
//                               alt="Full Image"
//                               width={1200}
//                               height={800}
//                               className="object-contain w-full h-full rounded-lg"
//                             />
//                           </DialogContent>
//                         </Dialog>
//                       </CarouselItem>
//                     ))}
//                   </CarouselContent>
//                   <CarouselPrevious className="absolute -translate-y-1/2 left-4 top-1/2" />
//                   <CarouselNext className="absolute -translate-y-1/2 right-4 top-1/2" />
//                 </Carousel>
//               </div>

//               {/* Details Section */}
//               <div className="flex flex-col p-8 space-y-6">
//                 <div>
//                   <div className="flex items-start justify-between">
//                     <h1 className="text-3xl font-bold text-gray-800">
//                       {data.title}
//                     </h1>
//                     <Badge
//                       variant={
//                         data.status === "Available" ? "default" : "destructive"
//                       }
//                       className="text-sm"
//                     >
//                       {data.status}
//                     </Badge>
//                   </div>
//                   <div className="flex items-center mt-2 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 mr-1.5" />
//                     <span>Posted on {data.postedDate}</span>
//                   </div>
//                 </div>

//                 <p className="text-base text-gray-600">{data.description}</p>

//                 <Separator />

//                 {/* Key Details */}
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <MapPin className="w-6 h-6 mt-1 text-gray-500" />
//                     <div>
//                       <p className="font-semibold text-gray-700">Location</p>
//                       <p className="text-gray-600">{data.location}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <Tag className="w-6 h-6 mt-1 text-gray-500" />
//                     <div>
//                       <p className="font-semibold text-gray-700">
//                         Price Options
//                       </p>
//                       <div className="flex flex-wrap gap-x-4 gap-y-2">
//                         <p className="text-xl font-bold text-green-600">
//                           {data.rentPrice}
//                         </p>
//                         <p className="text-xl font-bold text-blue-600">
//                           {data.sellPrice}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <Separator />

//                 {/* Contact Information and Actions */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Contact Information
//                   </h3>
//                   <div className="flex items-center space-x-3">
//                     <Phone className="w-5 h-5 text-gray-500" />
//                     <p className="text-gray-600">{data.contactPhone}</p>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <MessageCircle className="w-5 h-5 text-gray-500" />
//                     <p className="text-gray-600">{data.contactTelegram}</p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Button size="lg" className="flex-1">
//                     <Phone className="w-5 h-5 mr-2" /> Call Now
//                   </Button>
//                   <Button size="lg" variant="outline" className="flex-1">
//                     <MessageCircle className="w-5 h-5 mr-2" /> Send a Message
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// ??????????????????????????????????????????????????????????????????????????????????
// "use client";

// // import { useRouter } from "next/router"; // if using App Router use `useSearchParams` or `params.id`
// import Image from "next/image";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import Autoplay from "embla-carousel-autoplay";
// // import { useRouter } from "next/navigation";

// import img1 from "@/app/assets/images/image1.png";
// import img2 from "@/app/assets/images/image2.png";
// import img3 from "@/app/assets/images/image3.png";

// const dummyData = {
//   id: "1",
//   title: "Modern 2-Bedroom Apartment",
//   rentPrice: "4500 ETB/month",
//   sellPrice: "4987500",
//   status: "Available",
//   location: "Bole, Addis Ababa",
//   postedDate: "July 14, 2025",
//   contactPhone: "+251912345678",
//   contactTelegram: "@a2zmarket",
//   description:
//     "This modern apartment offers 2 bedrooms, a spacious living area, and a fully equipped kitchen. Located in a quiet neighborhood with easy access to transportation and shopping.",
//   images: [img1.src, img2.src, img3.src],
// };

// export default function DetailsPage() {
//   //   const router = useRouter();
//   //   const { id } = router.;

//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const data = dummyData; // Replace with fetch logic based on `id`

//   return (
//     <div className="max-w-4xl px-4 py-10 mx-auto">
//       <Card className="shadow-md rounded-2xl">
//         <CardContent className="p-0">
//           {/* Image Gallery Carousel */}
//           <div className="relative">
//             <Carousel plugins={[Autoplay({ delay: 4000 })]} className="w-full">
//               <CarouselContent>
//                 {data.images.map((src, index) => (
//                   <CarouselItem
//                     key={index}
//                     className="relative h-[300px] sm:h-[400px] cursor-zoom-in"
//                   >
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Image
//                           src={src}
//                           alt="Ad Image"
//                           fill
//                           className="object-cover rounded-t-2xl"
//                           onClick={() => setSelectedImage(src)}
//                         />
//                       </DialogTrigger>
//                       <DialogContent className="w-full max-w-6xl p-0 overflow-hidden bg-black rounded-xl">
//                         <Image
//                           src={src}
//                           alt="Full Image"
//                           width={1200}
//                           height={800}
//                           className="object-contain w-full h-full transition-transform duration-300 ease-in-out"
//                         />
//                       </DialogContent>
//                     </Dialog>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//             </Carousel>
//           </div>

//           {/* Details */}
//           <div className="p-6 space-y-4">
//             <div className="flex flex-wrap items-center justify-between gap-2">
//               <h2 className="text-2xl font-bold">{data.title}</h2>
//               <Badge>{data.status}</Badge>
//             </div>

//             <p className="text-sm text-muted-foreground">{data.postedDate}</p>

//             <Separator />

//             <p>{data.description}</p>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   📍 Location
//                 </p>
//                 <p>{data.location}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   💰 Price
//                 </p>
//                 <p className="text-lg font-semibold text-green-600">
//                   {data.price}
//                 </p>
//               </div>
//             </div>

//             <Separator />

//             <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium text-muted-foreground">
//                   📞 Contact
//                 </p>
//                 <p>{data.contactPhone}</p>
//                 <p>{data.contactTelegram}</p>
//               </div>
//               <div className="flex gap-2">
//                 <Button>Call</Button>
//                 <Button variant="secondary">Telegram</Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
