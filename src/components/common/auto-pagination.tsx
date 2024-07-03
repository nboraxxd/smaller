'use client'

import queryString from 'query-string'
import { usePathname, useSearchParams } from 'next/navigation'
import { Url } from 'next/dist/shared/lib/router/router'

import { cn } from '@/utils'
import useMediaQuery from '@/hook/use-media-query'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { omit } from 'lodash'

interface Props {
  currentPage: number
  pageSize: number
}

const DESKTOP_RANGE = 2
const MOBILE_RANGE = 1

export default function AutoPagination({ currentPage, pageSize }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = omit(queryString.parse(searchParams.toString()), 'page')

  const isMediumAndUp = useMediaQuery({ minWidth: 768 })
  const range = isMediumAndUp ? DESKTOP_RANGE : MOBILE_RANGE

  function renderPagination() {
    if (currentPage <= range + 1) {
      return Array.from(Array(range * 2 + 2)).map((_, i) => {
        const pageNumber = i + 1

        if (pageNumber > pageSize) return null

        if (pageNumber <= range * 2 + 1) {
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { ...newSearchParams, page: pageNumber } }}
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

        if (pageNumber <= 0) return null

        if (i === 0)
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { ...newSearchParams, page: pageNumber } }}
              isActive={pageNumber === currentPage}
              pageNumber={pageNumber}
            />
          )

        if (i === 1)
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { ...newSearchParams, page: pageNumber } }}
              isActive={pageNumber === currentPage}
              pageNumber={pageNumber}
            />
          )

        if (pageNumber <= pageSize) {
          return (
            <NumberedButton
              key={i}
              href={{ pathname, query: { ...newSearchParams, page: pageNumber } }}
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
              href={{ pathname, query: queryString.stringify(searchParams) }}
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
              href={{ pathname, query: { ...newSearchParams, page: pageNumber } }}
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
                ...newSearchParams,
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
                ...newSearchParams,
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
