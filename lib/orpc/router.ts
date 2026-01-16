import { os } from "@orpc/server";
import { z } from "zod";
import { getProducts } from "../products";
import { getAnnouncement } from "../announcement";

const products = os
  .input(
    z.optional(z.object({
      first: z.number().optional(),
      query: z.string().optional()
    }))
  )
  .handler(async({ input }) => {
    const data = await getProducts({
      first: input?.first,
      query: input?.query
    });
    return data;
  });

const announcement = os
  .handler(async() => {
    const data = await getAnnouncement();
    return data ;
  });

export const router = {
  products,
  announcement
}
