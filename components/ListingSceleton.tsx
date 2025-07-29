import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ListingCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border border-border bg-background shadow-sm p-0">
      {/* Image Skeleton */}
      <CardHeader className="p-0 relative h-[200px] w-full">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="space-y-2 pt-3 px-4 pb-4">
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-4 w-1/3 rounded" />
      </CardContent>
    </Card>
  );
};
