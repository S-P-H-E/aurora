import { api } from '@lib/eden'

export default async function Home() {
  const { data } = await api.get()

  console.log(data)

  return (
    <div>
      <h1>{data}</h1>
    </div>
  )
}