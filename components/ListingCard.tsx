"use client";

import { useState } from "react";
import { CircleDollarSign, Heart, MapPinnedIcon } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { Listing } from "@/types/types";

export const ListingCard = ({ listing }: { listing: Listing }) => {
  const [liked, setLiked] = useState(false);
  const isRent = listing.type.includes("rent");
  const isSale = listing.type.includes("sale");

  return (
    <Card className="group relative overflow-hidden border border-border bg-background hover:shadow-lg transition-all duration-200 p-0 md:max-w-[285px]">
      {/* Heart Button */}
      <div className="absolute z-10 top-2 right-2">
        <motion.button
          onClick={() => setLiked((prev) => !prev)}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-2 border rounded-full bg-background/80 backdrop-blur-md border-border hover:bg-background"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={liked ? "liked" : "not-liked"}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                className={`h-5 w-5 ${
                  liked ? "text-red-500 fill-red-500" : "text-muted-foreground"
                }`}
              />
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Type Badges */}
      <div className="absolute z-10 space-y-1 top-2 left-2">
        {listing.type.map((type, i) => (
          <span
            key={i}
            className={`text-xs font-semibold uppercase px-2 py-0.5 rounded-md shadow-sm ring-1 ring-border block
              ${
                type === "rent"
                  ? "bg-blue-600 text-white"
                  : "bg-green-600 text-white"
              }`}
          >
            {type === "rent" ? "For Rent" : "For Sale"}
          </span>
        ))}
      </div>

      {/* Image */}
      <Link href={listing.id}>
        <CardHeader className="p-0 relative h-[240px] w-full">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </CardHeader>

        {/* Info */}
        <CardContent className="px-4 pt-3 pb-4 space-y-1">
          <CardTitle className="text-base font-semibold truncate">
            {listing.title}
          </CardTitle>

          <p className="flex items-center text-sm truncate text-muted-foreground">
            <MapPinnedIcon className="w-4 h-4 mr-2" />
            {listing.location}
          </p>

          {/* Prices */}
          <div className="flex flex-col gap-1 mt-2">
            {isSale && (
              <div className="flex items-center gap-2 text-sm font-medium">
                <CircleDollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600">Sale: ETB </span>
                {listing.price.toLocaleString()}
              </div>
            )}
            {isRent && (
              <div className="flex items-center gap-2 text-sm font-medium">
                <CircleDollarSign className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-nowrap">Rent: ETB </span>
                {listing.price.toLocaleString()} /m
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
