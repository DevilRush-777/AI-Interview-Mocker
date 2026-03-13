"use client"
import { db } from '@/utils/db';
import { Mockinterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import QuestionSection from './__components/QuestionSection';
import RecordAnswerSection from './__components/RecordAnswerSection';


function StartInterview() {

    const params = useParams();

    const [interviewData,setInterviewData] = useState(null);
    const [mockInterviewQuestion,setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[])

    const GetInterviewDetails = async () => {

        const result = await db.select()
        .from(Mockinterview)
        .where(eq(Mockinterview.mockId, params.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);

        console.log("Questions:", jsonMockResp);

        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/*Questions*/}

            <QuestionSection mockInterviewQuestion={ mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            
            
            />
             {/*Video/Audio Recording*/}
            <RecordAnswerSection/>


        </div>
    </div>
  )
}

export default StartInterview;