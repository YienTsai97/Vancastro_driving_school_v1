"use client"

import { ChevronRight } from 'lucide-react'
import { LessonActionButtons } from '@/components/user-dashboard/lesson/lesson-action-btn'

type LessonData = {
  id: number
  startTime: string
  endTime: string
  location: string
  status: string
}

type LessonCardProps = {
  data: LessonData
  index: number
  handleAccept: (e: React.FormEvent) => void
  handleDecline: (e: React.FormEvent) => void
}

export default function LessonCard({ data, index, handleAccept, handleDecline }: LessonCardProps) {
  // Format dates for display
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) { 
      return `${error},${dateString}`; // Fallback to the original string if parsing fails
    }
  };
  
  const startTime = formatTime(data.startTime);
  const endTime = formatTime(data.endTime);

  return (
    <div 
      key={index}
      className="w-[90%] max-w-md m-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-row items-center justify-between rounded-lg p-4">
        <div className="flex flex-col">
          <h2 className="font-medium">
            {startTime} ~ {endTime}
          </h2>
          <p className="text-sm text-gray-500">{data.location}</p>
          <p className={`text-xs mt-1 ${
            data.status === 'APPROVED' ? 'text-green-600' : 
            data.status === 'CANCELLED' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {data.status}
          </p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>
      
      {/* Only show action buttons for pending lessons */}
      {data.status === 'PENDING' && (
        <LessonActionButtons
          lessonId={data.id}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </div>
  )
}