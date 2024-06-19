import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/common'

export default function Homepage() {
  return (
    <div className="flex items-center gap-8 p-8">
      <ModeToggle />
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  )
}
