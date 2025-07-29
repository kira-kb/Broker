"use client";

import Layout from "@/components/ui/Layout";
import { ListingCard } from "@/components/ListingCard";
import { Advertisements } from "@/components/Advertisements";
import { ListingCardSkeleton } from "@/components/ListingSceleton";
import { useBrokerStore } from "@/state/state";

export default function HomePage() {
  const { listings } = useBrokerStore();

  return (
    <Layout>
      <div className="space-y-8">
        <section>
          <Advertisements />
        </section>

        {/* Featured Listings */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Featured Listings</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
            <ListingCardSkeleton />
          </div>
        </section>
      </div>
    </Layout>
  );
}
