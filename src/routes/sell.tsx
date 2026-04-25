import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Camera, CheckCircle2, ShieldCheck, UploadCloud } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, conditions, type Category, type Condition } from "@/data-campus-trade";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "List an Item — CampusTrade" },
      {
        name: "description",
        content: "Create a CampusTrade listing with photo, category, price, dorm, condition, and WhatsApp contact.",
      },
      { property: "og:title", content: "List an Item — CampusTrade" },
      { property: "og:description", content: "Sell campus essentials to verified nearby students." },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>("Textbooks");
  const [condition, setCondition] = useState<Condition>("Good");
  const [dorm, setDorm] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft /> Marketplace
            </Link>
          </Button>
          <Badge variant="trust" className="gap-1.5">
            <ShieldCheck className="size-3.5" /> Verified Student
          </Badge>
        </header>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-secondary">Seller Dashboard</p>
            <h1 className="text-4xl font-bold tracking-tight">List an item in minutes.</h1>
            <p className="text-muted-foreground">
              Upload a photo, set a fair price, and let buyers message you directly on WhatsApp.
            </p>
            <div className="campus-card rounded-3xl border border-border bg-card p-5">
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-center">
                <div className="space-y-2 px-6">
                  <Camera className="mx-auto size-9 text-secondary" />
                  <p className="font-medium">Photo upload preview</p>
                  <p className="text-sm text-muted-foreground">Choose a clear item photo from your phone.</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="campus-card rounded-3xl border border-border bg-card p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium">Item title</span>
                <input
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Organic Chemistry Textbook"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Price</span>
                <input
                  required
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  type="number"
                  min="1"
                  placeholder="35"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Hostel / Dorm</span>
                <input
                  required
                  value={dorm}
                  onChange={(event) => setDorm(event.target.value)}
                  placeholder="Maple Hall"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as Category)}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Condition</span>
                <select
                  value={condition}
                  onChange={(event) => setCondition(event.target.value as Condition)}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                >
                  {conditions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium">WhatsApp number</span>
                <input
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  inputMode="tel"
                  placeholder="Include country code, e.g. 15551234567"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted p-5 text-sm font-medium transition hover:border-secondary hover:text-secondary sm:col-span-2">
                <UploadCloud className="size-5" /> Upload item image
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            </div>

            <Button type="submit" variant="energetic" className="mt-6 h-12 w-full rounded-xl">
              Publish Listing
            </Button>

            {submitted && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-4 text-sm">
                <CheckCircle2 className="mt-0.5 size-5 text-success" />
                <div>
                  <p className="font-semibold">Listing draft ready</p>
                  <p className="text-muted-foreground">
                    In this prototype, your listing is previewed locally. Cloud publishing can be added next.
                  </p>
                </div>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
