"use client"
import { db } from '@/utils/db';
import { Mockinterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';

function StartInterview() {

    const params = useParams();

    const [interviewData,setInterviewData] = useState(null);
    const [mockInterviewQuestion,setMockInterviewQuestion] = useState([]);

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
        <h2>Start Interview</h2>
    </div>
  )
}

export default StartInterview;