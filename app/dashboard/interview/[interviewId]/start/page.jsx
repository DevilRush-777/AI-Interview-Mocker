"use client"
import { db } from '@/utils/db';
import { Mockinterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import QuestionSection from './__components/QuestionSection';
import RecordAnswerSection from './__components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogOut } from 'lucide-react';
import Link from 'next/link';

function StartInterview() {
    const params = useParams();
    const router = useRouter();

    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select()
            .from(Mockinterview)
            .where(eq(Mockinterview.mockId, params.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    }

    const isLastQuestion = activeQuestionIndex === mockInterviewQuestion.length - 1;

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                />

                {/* Video / Audio Recording */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>

            {/* Navigation Buttons */}
            <div className='flex justify-end gap-4 mt-8 mb-6'>
                {/* Next Question button — hidden on last question */}
                {!isLastQuestion && (
                    <Button
                        onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                        className="flex items-center gap-2"
                    >
                        Next Question
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                )}

                {/* End Interview — always visible */}
                <Link href={`/dashboard/interview/${params.interviewId}/feedback`}>
                    <Button
                        variant={isLastQuestion ? 'default' : 'outline'}
                        className={`flex items-center gap-2 ${
                            isLastQuestion
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'border-red-400 text-red-500 hover:bg-red-50'
                        }`}
                    >
                        <LogOut className="h-4 w-4" />
                        End Interview
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default StartInterview;