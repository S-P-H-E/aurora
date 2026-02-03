import { z } from "zod";
import HeroCarousel from "./carousel";
import { CollectionsResponseSchema } from "@/lib/collections";

type Collections = z.infer<typeof CollectionsResponseSchema>;

const categories = ({ collections }: { collections: Collections }) => {
  return (
    <div id="categories" className="bg-white relative overflow-hidden min-h-[600px] md:min-h-[800px] lg:h-[900px] z-30">
        <div className='flex flex-col justify-center items-center my-8 md:my-10 lg:my-[40px] px-4'>
          <h1 className="text-3xl md:text-4xl lg:text-[50px] font-medium w-full max-w-[465px] text-center">Shop By Intention</h1>
          <p className="text-base md:text-lg lg:text-[20px] text-center mt-4">Pieces defined by natural beauty, vibrant energy,<br/> and a refined sense of timeless elegance.</p>
          <HeroCarousel collections={collections} />
        </div>
    </div>
  )
}

export default categories
