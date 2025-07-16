"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Listing = {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
};

export const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="p-0 relative h-48 w-full overflow-hidden rounded-t-md">
        <Image
          src={listing.image}
          alt={listing.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
        />
      </CardHeader>
      <CardContent className="space-y-1 pt-4">
        <CardTitle className="text-lg truncate">{listing.title}</CardTitle>
        <p className="text-muted-foreground text-sm truncate">
          {listing.location}
        </p>
        <p className="font-semibold text-primary">
          ETB {listing.price.toLocaleString()}
        </p>
        <Button variant="outline" className="w-full mt-2">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
