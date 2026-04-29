"use client"
import React, { useEffect, useState } from 'react'
import AddNewInterview from './__components/AddNewInterview'
import { db } from '@/utils/db'
import { Mockinterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MessageSquare, Play, Clock } from 'lucide-react'

function InterviewCard({ interview }) {
    const router = useRouter()
    return (
        <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition-all bg-white">
            <h2 className="font-bold text-purple-700 text-lg">{interview.jobPosition}</h2>
            <p className="text-gray-500 text-sm mt-1">{interview.jobExperience} Years of Experience</p>
            <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Created At: {interview.createdAt}
            </p>
            <div className="flex gap-3 mt-4">
                <Button
                    variant="outline"
                    className="flex-1 flex items-center gap-2"
                    onClick={() => router.push(`/dashboard/interview/${interview.mockId}/feedback`)}
                >
                    <MessageSquare className="h-4 w-4" />
                    Feedback
                </Button>
                <Button
                    className="flex-1 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => router.push(`/dashboard/interview/${interview.mockId}`)}
                >
                    <Play className="h-4 w-4" />
                    Start
                </Button>
            </div>
        </div>
    )
}

function Dashboard() {
    const { user } = useUser()
    const [interviewList, setInterviewList] = useState([])

    useEffect(() => {
        if (user) GetInterviewList()
    }, [user])

    const GetInterviewList = async () => {
        const result = await db
            .select()
            .from(Mockinterview)
            .where(eq(Mockinterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(Mockinterview.id)
        setInterviewList(result)
    }

    return (
        <div>
            <h2 className="font-bold text-2xl">Dashboard</h2>
            <h2 className="text-gray-500">Create and Start your AI Mockup Interview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
                <AddNewInterview />
            </div>

            {interviewList.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-semibold text-xl mb-4">Previous Mock Interview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {interviewList.map((interview) => (
                            <InterviewCard key={interview.mockId} interview={interview} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard