import { treaty } from '@elysiajs/eden'
import type { App } from '../../apps/api/index'

const api = treaty<App>('http://localhost:3001')

export { api }