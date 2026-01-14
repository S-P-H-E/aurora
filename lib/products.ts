import { z } from "zod";
import { shopifyFetch } from "./shopifyFetch";

export const ProductSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.string(),
    assets: z.array(z.object({
      id: z.string().optional(),
      url: z.string(),
      altText: z.union([z.string(), z.null()])
    }))
})

export const ProductsResponseSchema = z.array(ProductSchema)

const PRODUCTS_QUERY = `{
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
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

export async function getProducts() {
    const res = await shopifyFetch({
      query: PRODUCTS_QUERY
    })
    
    // Transform the nested structure: res.body.data.products.edges -> flat array of products
    const edges = res.body?.data?.products?.edges || []
    const products = edges.map((edge: any) => {
      const node = edge.node
      return {
        id: node.id,
        title: node.title,
        description: node.description || '',
        price: `${node.priceRange?.minVariantPrice?.amount} ${node.priceRange?.minVariantPrice?.currencyCode}`,
        assets: node.images?.edges?.map((imgEdge: any) => ({
          id: imgEdge.node.id,
          url: imgEdge.node.url,
          altText: imgEdge.node.altText
        })) || []
      }
    })
    
    return products as z.infer<typeof ProductsResponseSchema>
}