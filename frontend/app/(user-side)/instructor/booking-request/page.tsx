"use client"

import LessonCard from '@/components/user-dashboard/lesson/lesson-card';
import { toast } from '@/hooks/use-toast';
import { LessonStatus } from '@/types/lesson.type';
import { getLessons, updateLesson } from '@/utils/lessonFetch';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';

const BookingRequest = () => {
  const [lessons, setLessons] = useState<{ id: number; status: LessonStatus; startTime: string; endTime: string; location: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING');
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const lessonsResponse = await getLessons();
        if (lessonsResponse.data) {
          setLessons(
            lessonsResponse.data.map((lesson: { id: number; status: LessonStatus; startTime: string; endTime: string; location: string }) => ({
              id: lesson.id,
              status: lesson.status,
              startTime: lesson.startTime,
              endTime: lesson.endTime,
              location: lesson.location,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleLessonUpdate = async (
    e: React.FormEvent,
    lessonId: number,
    status: LessonStatus
  ): Promise<{ success: boolean; message?: string }> => {
    e.preventDefault();
    try {
      const lessonData = { status };
      const res = await updateLesson(lessonId, lessonData);
      if (res.success) {
        console.log(
          `Lesson ${status === LessonStatus.APPROVED ? 'accepted' : 'declined'
          } successfully`
        );
        setLessons(prevLessons =>
          prevLessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, status } : lesson
          )
        );
      } else {
        console.error(`Error updating lesson:`, res.message);
      }
      return { success: res.success, message: res.message };
    } catch (error) {
      console.error("Error in handleLessonUpdate:", error);
      return { success: false, message: "Unexpected error" };
    }
  };

  const handleAccept = (lessonId: number) => async (e: React.FormEvent) => {
    await handleLessonUpdate(e, lessonId, LessonStatus.APPROVED);
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lessons/status/pending`);
  }

  const handleDecline = (lessonId: number) => async (e: React.FormEvent) => {
    const confirmed = confirm("Are you sure?")
    if (!confirmed) return;
    const update = await handleLessonUpdate(e, lessonId, LessonStatus.CANCELLED);
    if (update.success) {
      toast({
        title: "Success",
        description: "Lesson cancelled successfully",
        variant: "success",
      });
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lessons/status/pending`);
    } else {
      toast({
        title: "Error",
        description: update.message || "Failed to cancel lesson",
        variant: "destructive",
      });
    }
  }

  const filteredLessons = lessons.filter(lesson => {
    if (filter === 'ALL') return true;
    return lesson.status === filter;
  });

  if (loading) {
    return <div className="w-full flex justify-center items-center h-64">Loading...</div>;
  }



  return (
    <div className="w-full flex flex-col my-5 border-b border-gray-200 m-6">
      <div className="flex flex-row space-x-2 font-medium" >
        <button
          onClick={() => setFilter('PENDING')}
          className={`pb-2 px-4  transition-all ease-in-out duration-150 ${filter === 'PENDING' ? 'border-b-2 border-black ext-black' : 'text-gray-400'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('CANCELLED')}
          className={`pb-2 px-4  transition-all ease-in-out duration-150 ${filter === 'CANCELLED' ? 'border-b-2 border-black ext-black' : 'text-gray-400'}`}
        >
          Declined
        </button>
        <button
          onClick={() => setFilter('ALL')}
          className={`pb-2 px-4  transition-all ease-in-out duration-150 ${filter === 'ALL' ? 'border-b-2 border-black ext-black' : 'text-gray-400'}`}
        >
          All
        </button>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="text-center py-8">No lessons match the selected filter</div>
      ) : (
        filteredLessons.map((data, index) => (
          <LessonCard
            key={data.id}
            data={{
              id: data.id,
              status: data.status,
              startTime: data.startTime,
              endTime: data.endTime,
              location: data.location,
            }}
            index={index}
            handleAccept={handleAccept(data.id)}
            handleDecline={handleDecline(data.id)}
          />
        ))
      )}
    </div>
  );
};

export default BookingRequest;