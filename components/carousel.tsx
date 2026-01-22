"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselItems } from "@/lib/carousel-items";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


export default function HeroCarousel() {
  return (
    <section className="w-full px-6 py-16 ml-[120px] mt-10 mb-20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        {/* Slides */}
        <CarouselContent className="-ml-4">
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[85%] md:basis-[60%] lg:basis-[48%] group"
            >
              <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="mb-2 text-sm opacity-80">{item.title}</p>
                  <h2 className="text-2xl font-semibold">
                    {item.headline}
                  </h2>
                </div>

            <Dialog>
                <DialogTrigger asChild>
                    <button className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur group-hover:bg-amber-600 transition-all duration-700">
                    +
                    </button>
                </DialogTrigger>

                {/* Blurred + locked background */}
                <DialogOverlay className="bg-black/40 backdrop-blur-md" />

                <DialogContent
                    className="
                    fixed
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-full
                    max-w-5xl
                    h-[100dvh]
                    md:h-[90vh]
                    overflow-y-auto
                    overscroll-contain
                    p-0
                    rounded-none
                    md:rounded-2xl
                    "
                >
                    {/* REQUIRED for a11y */}
                    <DialogTitle className="sr-only">
                    TrekDrive — Twice the Efficiency. All the Freedom.
                    </DialogTitle>

                    {/* Content */}
                    <div className="px-10 pb-16 space-y-10">
                    <header className="pt-10">
                        <p className="text-sm text-muted-foreground">TrekDrive</p>
                        <h2 className="mt-2 text-3xl font-semibold">
                        Twice the Efficiency. All the Freedom.
                        </h2>
                    </header>

                    <img
                        src="/images/trekdrive.jpg"
                        alt="TrekDrive"
                        className="h-[420px] w-full rounded-xl object-cover"
                    />

                    <div className="max-w-3xl space-y-6 text-muted-foreground">
                        <p>
                        TrekDrive combines electric efficiency with long-range capability,
                        giving you complete freedom to explore without compromise.
                        </p>
                        <p>
                        Add as much content as you want here — specs, tables, videos,
                        carousels — this dialog will scroll properly.
                        </p>
                    </div>
                    </div>
                </DialogContent>
                </Dialog>


              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Bottom controls */}
        <div className="mt-8 flex items-center gap-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
