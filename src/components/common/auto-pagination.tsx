'use client'

import { cn } from '@/utils'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import useMediaQuery from '@/hook/use-media-query'
import { Url } from 'next/dist/shared/lib/router/router'

interface Props {
  currentPage: number
  pageSize: number
  pathname: string
}

const DESKTOP_RANGE = 2
const MOBILE_RANGE = 1

export default function AutoPagination({ currentPage, pageSize, pathname }: Props) {
  const isMediumAndUp = useMediaQuery({ minWidth: 768 })

  const range = isMediumAndUp ? DESKTOP_RANGE : MOBILE_RANGE

  function renderPagination() {
    if (currentPage <= range + 1) {
      return Array.from(Array(range * 2 + 2)).map((_, i) => {
        const pageNumber = i + 1
        if (pageNumber <= range * 2 + 1) {
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { page: pageNumber } }}
              isActive={pageNumber === currentPage}
              pageNumber={pageNumber}
            />
          )
        } else {
          return (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        }
      })
    } else if (currentPage > pageSize - range) {
      return Array.from(Array(range * 2 + 3)).map((_, i) => {
        const pageNumber = pageSize - range * 2 - 2 + i

        if (i === 0)
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { page: pageNumber } }}
              isActive={pageNumber === currentPage}
              pageNumber={pageNumber}
            />
          )

        if (i === 1)
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { page: pageNumber } }}
              isActive={pageNumber === currentPage}
              pageNumber={pageNumber}
            />
          )

        if (pageNumber <= pageSize) {
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { page: pageNumber } }}
              isActive={pageNumber === currentPage}
              pageNumber={pageNumber}
            />
          )
        }

        return (
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      })
    } else {
      return Array.from(Array(range * 2 + 4)).map((_, i) => {
        const pageNumber = i + currentPage - range - 2

        if (i === 0)
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { page: 1 } }}
              isActive={pageNumber === currentPage}
              pageNumber={1}
            />
          )

        if (pageNumber === currentPage - range - 1 && pageNumber > 1)
          return (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          )

        if (pageNumber >= currentPage - range && pageNumber <= currentPage + range && pageNumber <= pageSize) {
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { page: pageNumber } }}
              isActive={pageNumber === currentPage}
              pageNumber={pageNumber}
            />
          )
        }

        if (pageNumber <= pageSize && pageNumber === currentPage + range + 1)
          return (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          )

        return null
      })
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={{
              pathname,
              query: {
                page: currentPage - 1,
              },
            }}
            className={cn({
              'cursor-not-allowed': currentPage === 1,
            })}
            onClick={(e) => {
              if (currentPage === 1) {
                e.preventDefault()
              }
            }}
          />
        </PaginationItem>

        {renderPagination()}

        <PaginationItem>
          <PaginationNext
            href={{
              pathname,
              query: {
                page: currentPage + 1,
              },
            }}
            className={cn({
              'cursor-not-allowed': currentPage === pageSize,
            })}
            onClick={(e) => {
              if (currentPage === pageSize) {
                e.preventDefault()
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function NumberedButton({ href, isActive, pageNumber }: { href: Url; isActive: boolean; pageNumber: number }) {
  return (
    <PaginationItem>
      <PaginationLink href={href} isActive={isActive}>
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  )
}
