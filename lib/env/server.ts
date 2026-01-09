import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	// clientPrefix: "NEXT_PUBLIC_",
	// client: {
	// 	NEXT_PUBLIC_BASE_URL: z.url(),
	// },
	server: {
        SHOPIFY_TOKEN: z.string().min(1),
		SHOPIFY_DOMAIN: z.url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});