"use client"
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Mockinterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb,  WebcamIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Link from "next/link";

function Interview() {
    const [interviewData,setInterviewData]=useState(null);
    const [WebCamEnabled,setWebCamEnabled]=useState(false);

  const params = useParams();

  useEffect(()=>{
    GetInterviewDetails();
  },[])

  const GetInterviewDetails = async () => {

    const result = await db.select()
    .from(Mockinterview)
    .where(eq(Mockinterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  }

  return (
    <div className="my-10 ">

        <h2 className="font-bold text-2xl"> Lets Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

  {/* LEFT SIDE */}
  <div className="flex flex-col gap-5">

    <div className="flex flex-col p-5 rounded-lg border gap-5">
      <h2 className="text-lg">
        <strong>Job Role/Job Position:</strong> {interviewData?.jobPosition}
      </h2>

      <h2 className="text-lg">
        <strong>Job Description:</strong> {interviewData?.jobDescription}
      </h2>

      <h2 className="text-lg">
        <strong>Year of Experience:</strong> {interviewData?.jobExperience}
      </h2>
    </div>

    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 text-yellow-500">
      <h2 className="flex items-center gap-2 font-bold">
        <Lightbulb />
        Information
      </h2>

      <p className="mt-2 text-yellow-500">
        {process.env.NEXT_PUBLIC_INFORMATION}
      </p>
    </div>

  </div>


  {/* RIGHT SIDE */}
  <div className="flex flex-col items-center">

    {WebCamEnabled ? (
      <Webcam
        onUserMedia={() => setWebCamEnabled(true)}
        onUserMediaError={() => setWebCamEnabled(false)}
        mirrored={true}
        style={{
          height: 300,
          width: 300
        }}
      />
    ) : (
      <>
        <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />

        <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
          Enable Web Cam and Microphone
        </Button>
      </>
    )}

  </div>

</div>
<div className="flex justify-end items-end">
  <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
   <Button>
    Start Interview
   </Button>
  </Link>
</div>
    </div>
  );
}

export default Interview;