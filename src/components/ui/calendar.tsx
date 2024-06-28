'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker, useDayPicker, useNavigation } from 'react-day-picker'

import { cn } from '@/utils'
import { buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-2 md:p-3', className)}
      classNames={{
        caption_dropdowns: 'mx-9 flex grow items-center',
        months: 'flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0',
        month: 'space-y-2 md:space-y-4',
        caption: 'relative flex items-center justify-center pt-1',
        caption_label: 'hidden text-sm font-medium',
        nav: 'flex items-center space-x-1',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground md:w-9',
        row: 'mt-1 flex w-full md:mt-2',
        cell: 'relative size-8 p-0 text-center text-sm focus-within:relative focus-within:z-20 md:size-9 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
        day: cn(buttonVariants({ variant: 'ghost' }), 'size-8 p-0 font-normal aria-selected:opacity-100 md:size-9'),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="size-4" />,
        IconRight: () => <ChevronRight className="size-4" />,
        Dropdown: (dropdownProps) => {
          const { currentMonth, goToMonth } = useNavigation()
          const { fromYear, fromMonth, fromDate, toYear, toMonth, toDate } = useDayPicker()

          let selectValues: { value: string; label: string }[] = []

          if (dropdownProps.name === 'months') {
            selectValues = Array.from({ length: 12 }, (_, index) => ({
              value: index.toString(),
              label: `Tháng ${format(new Date(0, index), 'M')}`,
            }))
          } else if (dropdownProps.name === 'years') {
            const earliestYear = fromYear ?? fromMonth?.getFullYear() ?? fromDate?.getFullYear()
            const latestYear = toYear ?? toMonth?.getFullYear() ?? toDate?.getFullYear()

            if (earliestYear && latestYear) {
              const yearsLength = latestYear - earliestYear + 1

              selectValues = Array.from({ length: yearsLength }, (_, index) => ({
                value: (earliestYear + index).toString(),
                label: (earliestYear + index).toString(),
              }))
            }
          }

          const caption = format(currentMonth, dropdownProps.name === 'months' ? "'Tháng' M" : 'yyyy')

          return (
            <Select
              value={dropdownProps.value?.toString()}
              onValueChange={(newValue) => {
                if (dropdownProps.name === 'months') {
                  const newDate = new Date(currentMonth)
                  newDate.setMonth(parseInt(newValue))
                  goToMonth(newDate)
                } else if (dropdownProps.name === 'years') {
                  const newDate = new Date(currentMonth)
                  newDate.setFullYear(parseInt(newValue))
                  goToMonth(newDate)
                }
              }}
            >
              <SelectTrigger className="h-8 p-1.5 text-[10px] last:ml-1 last:justify-center last:gap-3 md:text-xs">
                {caption}
              </SelectTrigger>
              <SelectContent>
                {selectValues.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
