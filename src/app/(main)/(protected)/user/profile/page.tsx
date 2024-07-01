import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { User } from '@/types/user.type'
import userApi from '@/api-requests/user.api'
import { ChangePasswordForm, UpdateProfileForm } from '@/components/forms'

export default async function ProfilePage() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) redirect('/login')

  let user: User | null = null

  try {
    const response = await userApi.getUserFromServerToBackend(accessToken)

    user = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <>
      {user ? <h2 className="text-2xl font-medium">{user.name}</h2> : null}
      <UpdateProfileForm />
      <ChangePasswordForm />
    </>
  )
}
