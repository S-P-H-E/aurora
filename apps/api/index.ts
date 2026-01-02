import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import "dotenv/config"

const app = new Elysia({ adapter: node() })
	.get('/', () => 'Hello Elysia')
	

app.listen(3001, ({ hostname, port }) => {
  console.log(
    `🦊 Elysia is running at ${hostname}:${port}`
  )
})

export type App = typeof app