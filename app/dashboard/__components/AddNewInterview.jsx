"use client"
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateInterviewQuestions } from "@/utils/geminiAIModel";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { LoaderCircle } from "lucide-react";
import { Mockinterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";



function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobPosition,setJobposition]=useState("");
    const [jobDescription,setJobDescription]=useState("");
    const [jobExperience,setJobExperience]=useState("");
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const {user}=useUser();
    const router = useRouter();
    const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const InputPrompt =
      "Job Position: " + jobPosition +
      ", Job Description: " + jobDescription +
      ", Years of Experience: " + jobExperience +
      ", Depends on this information please give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Interview question with Answered in Json Format, Give Question and Answered as field on JSON";

    const result = await generateInterviewQuestions(InputPrompt);

    const jsonMatch = result.match(/\[.*\]/s);

    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response");
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    console.log(parsedData);

    setJsonResponse(parsedData);

    const resp = await db.insert(Mockinterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(parsedData),
        jobPosition: jobPosition,
        jobDescription: jobDescription,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdAt: moment().format("DD-MM-YYYY")
      })
      .returning({ mockId: Mockinterview.mockId });

    console.log("Inserted ID:", resp);
    if(resp){
      setOpenDailog(false);
    }
    
    router.push("/dashboard/interview/" + resp[0].mockId);

  } catch (error) {
    console.error("Error generating interview:", error);
  }

  setLoading(false);
};
    
   


  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all" onClick={()=>setOpenDailog(true)}>
        <h2 className=" text-lg text-center">
          + Add New
        </h2>
      </div>
      <Dialog open={openDailog}>
      
         <DialogContent className="max-w-2xl">
          <DialogHeader>
          <DialogTitle className="text-2xl">Tell Us More About your Job Interviewing</DialogTitle>
         <DialogDescription>
             Add Details About your Job Position/role, Job Description and Year of Experience
            
          </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div>
               
                <div className="mt-7 my-3" >
                    <br></br>
                    <label>Job Role/Job Position</label>
                    <Input placeholder='Ex.Full Stack Developer' required  onChange={(event)=>setJobposition(event.target.value)}/>                </div>
                    <div className="mt-7 my-3" >
                    
                    <label>Job Description/Tech Stack</label>
                    <Textarea placeholder='Ex.react,node.js etc'required  onChange={(event)=>setJobDescription(event.target.value)}/>                </div>
                     <div className="mt-7 my-3" >
                    
                    <label>Years of Experience</label>
                    <Input placeholder='Ex.5' type='number' max="100" required onChange={(event)=>setJobExperience(event.target.value)}/>                </div>
                    
            </div>

       
         <div className="flex gap-5 justify-end">
             <Button  type='button' variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
              <Button type='submit' disabled={loading} >
                {loading?
                <>
                <LoaderCircle className="animate-spin"/>'GEnerating from AI'
                </>:'Start Interview'
              }
                
                </Button>
         </div>
         </form>
           </DialogContent>
         </Dialog>
    </div>
  );
}

export default AddNewInterview;