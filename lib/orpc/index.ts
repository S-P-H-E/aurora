import { router } from "@/lib/orpc/router"
import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { RouterClient } from "@orpc/server"
import { env } from "../env/web"

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
  ? `https://${env.NEXT_PUBLIC_BASE_URL}`
  : "http://localhost:3000";

const rpcLink = new RPCLink({
    url: `${baseUrl}/rpc`
})

export const api: RouterClient<typeof router> = createORPCClient(rpcLink)