import Layout from "@/components/ui/Layout";
import { ListingCard } from "@/components/ListingCard";

import img1 from "./assets/images/image1.png";
import img2 from "./assets/images/image2.png";
import img3 from "./assets/images/image3.png";
import { Advertisements } from "@/components/Advertisements";

const dummyListings = [
  {
    id: "1",
    title: "Modern House in Addis Ababa",
    location: "Bole",
    price: 3500000,
    image: img1.src,
  },
  {
    id: "2",
    title: "Toyota Vitz 2015",
    location: "Kazanchis",
    price: 1200000,
    image: img2.src,
  },
  {
    id: "3",
    title: "Luxury Apartment at Sarbet",
    location: "Sarbet",
    price: 7500000,
    image: img3.src,
  },
];

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <section>
          <Advertisements />
        </section>

        {/* Featured Listings */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Featured Listings</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dummyListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
