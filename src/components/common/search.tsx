import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Search() {
  return (
    <Button variant="ghost" size="icon">
      <SearchIcon className="size-5" />
      <span className="sr-only">Tìm kiếm</span>
    </Button>
  )
}
