import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import userApi from '@/api-requests/user.api'
import { Button } from '@/components/ui/button'

export default async function UserPage() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) redirect('/login')

  let user

  try {
    const response = await userApi.getUserFromServerToBackend(accessToken)

    user = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <div>
      <p>{user?.name}</p>
      <Button asChild>
        <Link href="/">homepage</Link>
      </Button>
    </div>
  )
}
