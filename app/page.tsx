import { api } from "@/lib/orpc";
import { ReactLenis } from "lenis/react";
import SignaturePicks from "@/components/signaturepicks";

export default async function Home() {
  const data = await api.announcement();

  return (
    <>
      <ReactLenis root />

      <SignaturePicks data={data} />
      <div className="bg-blue-500 text-white h-dvh">
        <h1>hello</h1>
      </div>
    </>
  );
}
