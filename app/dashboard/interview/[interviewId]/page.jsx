"use client"
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Mockinterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview() {
    const [interviewData,setInterviewData]=useState();
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
    <div className="my-10 flex justify-center flex-col items-center">

        <h2 className="font-bold text-2xl"> Lets Get Started</h2>
        <div>
          {WebCamEnabled?<Webcam 
          onUserMedia={()=>setWebCamEnabled(true)}
          onUserMediaError={()=>setWebCamEnabled(false)}
          mirrored={true}
          style={{
             height:300,
             width:300
          }}
          />
          :
          <>
          <WebcamIcon className="h-72 w-full  my-7 p-20 bg-secondary rounded-lg border"/>
          <Button onClick={()=>setWebCamEnabled(true)}> Enable Web Cam and Microphone</Button>
          </>
          }   
        </div>
        <div>
            
        </div>
    </div>
  );
}

export default Interview;