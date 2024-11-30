import { redirect } from 'next/navigation'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  
  return redirect(`/${type ? `?type=${type}` : ''}`)
}
