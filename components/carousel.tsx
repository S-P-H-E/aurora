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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function HeroCarousel() {
  return (
    <section className="w-full px-6 py-16 ml-[120px] mt-10 mb-20">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        {/* Slides */}
        <CarouselContent className="-ml-4 mr-20 ">
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
                <button className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur group-hover:bg-amber-600 transition-all">
                  +
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Scrollable Content</DialogTitle>
                  <DialogDescription>
                    This is a dialog with scrollable content.
                  </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <p key={index} className="mb-4 leading-normal">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat
                      nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  ))}
                </div>
              </DialogContent>
            </Dialog>


              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        

            <div
              aria-hidden
              className="
                pl-4
                basis-[7.5%]
                md:basis-[20%]
                lg:basis-[26%]
              "
            />

        {/* Bottom controls */}
        <div className="mt-8 flex items-center gap-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
