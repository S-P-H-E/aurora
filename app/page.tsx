import { getAnnouncement } from "@/lib/announcement";
import { ReactLenis } from "lenis/react";
import Hero from "@/components/hero";
import SignaturePicks from "@/components/signaturepicks";
import Categories from "@/components/categories";
import Reviews from "@/components/reviews";
import FAQs from "@/components/faqs";
import CTA from "@/components/cta";
import { getCollections } from "@/lib/collections";

export default async function Home() {
  const data = await getAnnouncement();
  const collections = await getCollections();

  return (
    <>
      <ReactLenis root /> 

      <Hero data={data} />
      <SignaturePicks />
      <Categories collections={collections} />
      <Reviews />
      <FAQs />
      <CTA />
    </>
  );
}
