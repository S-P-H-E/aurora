import { z } from "zod";
import { shopifyFetch } from "./shopifyFetch";

export const ProductSchema = z.object({
    id: z.string(),
    variantId: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.string(),
    soldOut: z.boolean(),
    assets: z.array(z.object({
      id: z.string().optional(),
      url: z.string(),
      altText: z.union([z.string(), z.null()])
    }))
})

export const ProductsResponseSchema = z.array(ProductSchema)

const PRODUCTS_QUERY = `query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
}`

// const PRODUCTS_QUERY = `{
//     shop { name }
// }`

export async function getProducts({ first = 250, query }: { first?: number; query?: string } = {}) {
    const res = await shopifyFetch({
      query: PRODUCTS_QUERY,
      variables: { first, query: query && query.trim().length > 0 ? query : undefined }
    })
    
    // Transform the nested structure: res.body.data.products.edges -> flat array of products
    const edges = res.body?.data?.products?.edges || []
    const products = edges.map((edge: any) => {
      const node = edge.node
      const variant = node.variants?.edges?.[0]?.node
      return {
        id: node.id,
        variantId: variant?.id || node.id,
        title: node.title,
        description: node.description || '',
        price: `${node.priceRange?.minVariantPrice?.amount} ${node.priceRange?.minVariantPrice?.currencyCode}`,
        soldOut: !(variant?.availableForSale ?? node.availableForSale ?? true),
        assets: node.images?.edges?.map((imgEdge: any) => ({
          id: imgEdge.node.id,
          url: imgEdge.node.url,
          altText: imgEdge.node.altText
        })) || []
      }
    })
    
    return products as z.infer<typeof ProductsResponseSchema>
}