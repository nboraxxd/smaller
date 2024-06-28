'use client'

import Link from 'next/link'

import { useAuthStore } from '@/lib/stores/auth-store'
import { useUserQuery } from '@/lib/tanstack-query/use-user'
import { useLogoutToServerMutation } from '@/lib/tanstack-query/use-auth'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { handleBrowserErrorApi } from '@/utils/error'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function DropdownAvatar() {
  const router = useRouter()

  const { isAuth, setIsAuth } = useAuthStore((state) => state)

  const logoutToServerMutation = useLogoutToServerMutation()
  const { data: getUserResponse, isLoading: isLoadingGetUser, isSuccess: isSuccessGetUser } = useUserQuery(isAuth)

  async function handleLogout() {
    if (logoutToServerMutation.isPending) return

    try {
      const response = await logoutToServerMutation.mutateAsync()

      setIsAuth(false)
      router.push('/')
      router.refresh()
      toast.success(response.payload.message)
    } catch (error) {
      handleBrowserErrorApi({ error })
    }
  }

  if (isLoadingGetUser) return <Skeleton className="size-9" />

  return isAuth && isSuccessGetUser ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <Avatar>
            <AvatarImage
              src={getUserResponse.payload.data.avatar ?? undefined}
              alt={getUserResponse.payload.data.name}
            />
            <AvatarFallback>{getUserResponse.payload.data.name?.slice(0, 2).toUpperCase() || 'S'}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Tài khoản</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-36">
        <DropdownMenuLabel>
          <span className="line-clamp-1">{getUserResponse.payload.data.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/user" className="cursor-pointer">
            Tài khoản
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="md:hidden">
          <Link href="/wishlist" className="cursor-pointer">
            Yêu thích
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/orders" className="cursor-pointer">
            Đơn hàng
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null
}
