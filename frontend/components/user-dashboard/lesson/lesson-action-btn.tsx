"use client"

import { Button } from '@/components/ui/button'

type LessonActionButtonsProps = {
  lessonId: number
  onAccept: (e: React.FormEvent) => void
  onDecline: (e: React.FormEvent) => void
}

export const LessonActionButtons = ({
  onAccept,
  onDecline,
}: LessonActionButtonsProps) => {
  return (
    <div className="w-full gap-2 flex flex-row mt-3">
      <Button
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
        onClick={onAccept}
      >
        Accept
      </Button>
      <Button
        variant="outline"
        className="w-full border-slate-500"
        onClick={onDecline}
      >
        Decline
      </Button>
    </div>
  )
}