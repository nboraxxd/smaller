'use client'

import { ComponentProps, ReactNode, useEffect, useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'

import { formatSecondsToMMSS } from '@/utils'
import { Button } from '@/components/ui/button'

interface Props extends ComponentProps<'button'> {
  children: ReactNode
  countdownTime: number
  shouldStartCountdown: boolean
  isLoading?: boolean
}

export default function CountdownButton(props: Props) {
  const { children, countdownTime, shouldStartCountdown, isLoading, disabled, ...rest } = props

  const [isWaiting, setIsWaiting] = useState(shouldStartCountdown)
  const [countdown, setCountdown] = useState(countdownTime)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (isWaiting) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          const remainingSeconds = prevCountdown - 1
          if (remainingSeconds <= 0) {
            clearInterval(timer) // Stop the countdown when it reaches 0
            setIsWaiting(false)
          }

          return remainingSeconds
        })
      }, 1000)
    }

    return () => clearInterval(timer) // Cleanup timer when the component unmounts
  }, [isWaiting])

  useEffect(() => {
    if (shouldStartCountdown) {
      setIsWaiting(true)
      setCountdown(countdownTime)
    }
  }, [countdownTime, shouldStartCountdown])

  return (
    <Button disabled={disabled || isLoading || isWaiting} className="w-full gap-1.5" {...rest}>
      {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
      {isWaiting ? `Gửi lại email sau ${formatSecondsToMMSS(countdown)}` : children}
    </Button>
  )
}
