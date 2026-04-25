import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campusItems, getCampusItem } from "@/data-campus-trade";
import { useWatchlist } from "@/hooks/use-watchlist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/items/$itemId")({
  loader: ({ params }) => {
    const item = getCampusItem(params.itemId);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} — CampusTrade` },
      { name: "description", content: `${loaderData.title} for $${loaderData.price} from ${loaderData.dorm}.` },
      { property: "og:title", content: `${loaderData.title} — CampusTrade` },
      { property: "og:description", content: loaderData.description },
      { property: "og:image", content: loaderData.image },
      { name: "twitter:image", content: loaderData.image },
    ],
  }),
  notFoundComponent: ItemNotFound,
  errorComponent: ItemError,
  component: ItemDetailPage,
});

function ItemNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Listing not found</h1>
        <p className="text-muted-foreground">This campus item may have been sold or removed.</p>
        <Button asChild variant="energetic">
          <Link to="/">Back to marketplace</Link>
        </Button>
      </div>
    </main>
  );
}

function ItemError() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Couldn’t load listing</h1>
        <p className="text-muted-foreground">Please return to CampusTrade and try again.</p>
        <Button asChild variant="energetic">
          <Link to="/">Back to marketplace</Link>
        </Button>
      </div>
    </main>
  );
}

function ItemDetailPage() {
  const item = Route.useLoaderData();
  const { isWatched, toggleWatchlist } = useWatchlist();
  const message = encodeURIComponent(
    `Hi ${item.seller}, I saw your ${item.title} on CampusTrade. Is it still available?`,
  );
  const whatsappUrl = `https://wa.me/${item.phone}?text=${message}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft /> Marketplace
            </Link>
          </Button>
          <button
            onClick={() => toggleWatchlist(item.id)}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm transition hover:border-accent hover:text-accent"
          >
            <Heart className={cn("size-4", isWatched(item.id) && "fill-accent text-accent")} /> Watchlist
          </button>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant={item.condition === "New" ? "success" : "secondary"}>{item.condition}</Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold tracking-tight">{item.title}</h1>
                <p className="rounded-2xl bg-secondary px-4 py-2 text-2xl font-bold text-secondary-foreground">
                  ${item.price}
                </p>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </div>

            <section className="campus-card rounded-3xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Seller</p>
                  <h2 className="text-xl font-semibold">{item.seller}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" /> {item.dorm}
                  </p>
                </div>
                <Badge variant="trust" className="gap-1.5">
                  <ShieldCheck className="size-3.5" /> Verified Student
                </Badge>
              </div>
              <Button asChild variant="whatsapp" className="mt-5 h-12 w-full rounded-xl">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
            </section>

            <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-semibold">Recommended Meetup Spots</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {["Main Library", "Main Canteen", "Student Center"].map((spot) => (
                  <div key={spot} className="rounded-2xl bg-muted p-3 text-sm font-medium">
                    {spot}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">More nearby listings</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {campusItems
              .filter((nearby) => nearby.id !== item.id)
              .slice(0, 3)
              .map((nearby) => (
                <Link
                  key={nearby.id}
                  to="/items/$itemId"
                  params={{ itemId: nearby.id }}
                  className="group rounded-3xl border border-border bg-card p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={nearby.image}
                    alt={nearby.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold group-hover:text-secondary">{nearby.title}</p>
                      <p className="text-sm text-muted-foreground">{nearby.dorm}</p>
                    </div>
                    <p className="font-bold">${nearby.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
