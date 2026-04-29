"use client"
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
let useSpeechToText;

if (typeof window !== "undefined") {
  useSpeechToText = require("react-hook-speech-to-text").default;
}
import { Mic, MicOff, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateInterviewQuestions } from '@/utils/geminiAIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset answer + saved state when question changes
  useEffect(() => {
    setUserAnswer('');
    setSaved(false);
  }, [activeQuestionIndex]);

  const speechToText = useSpeechToText
    ? useSpeechToText({ continuous: true, useLegacyResults: false })
    : {};

  const {
    isRecording = false,
    results = [],
    startSpeechToText,
    stopSpeechToText,
  } = speechToText;

  // Accumulate transcript
  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prev) => prev + result?.transcript);
    });
  }, [results]);

  if (!isClient) return null;

  const SaveUserAns = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (!userAnswer || userAnswer.trim().length < 10) {
        toast.error('Answer too short — please record at least a sentence.');
        return;
      }

      setSaving(true);
      try {
        const currentQuestion = mockInterviewQuestion[activeQuestionIndex];

        const feedbackPrompt = `
You are an expert technical interview coach.

Interview Question: "${currentQuestion?.question}"
Candidate's Answer: "${userAnswer}"

Provide:
1. A rating out of 10 (integer only)
2. Specific feedback in 3-5 lines on areas of improvement

Return ONLY valid JSON like this:
{
  "rating": 7,
  "feedback": "Your feedback here."
}
`;
        const aiRaw = await generateInterviewQuestions(feedbackPrompt);
        const jsonMatch = aiRaw.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Invalid AI response');
        const parsed = JSON.parse(jsonMatch[0]);

        await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          Question: currentQuestion?.question,
          correctAns: currentQuestion?.answer,
          userAns: userAnswer,
          feedback: parsed?.feedback,
          rating: String(parsed?.rating),
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        });

        setSaved(true);
        toast.success('Answer saved! ✅');
      } catch (err) {
        console.error('Error saving answer:', err);
        toast.error('Failed to save. Please try again.');
      } finally {
        setSaving(false);
      }
    } else {
      setUserAnswer('');
      setSaved(false);
      startSpeechToText();
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>

      {/* Webcam */}
      <div className='flex flex-col mt-20 justify-center items-center rounded-lg p-5 bg-black relative'>
        <Image src={'/webcam.png'} width={200} height={200}
          className='absolute z-20' alt="Webcam frame overlay" />
        <Webcam mirrored={true} style={{ height: 300, width: '100%', zIndex: 10 }} />
      </div>

      {/* Record button */}
      <Button
        variant='outline'
        className={`my-6 min-w-44 transition-all ${isRecording ? 'border-red-500 animate-pulse' : saved ? 'border-green-500' : ''}`}
        onClick={SaveUserAns}
        disabled={saving || saved}
      >
        {saving ? (
          <span className='flex items-center gap-2'>
            <Loader2 className='animate-spin h-4 w-4' /> Saving...
          </span>
        ) : saved ? (
          <span className='flex items-center gap-2 text-green-600'>
            <CheckCircle2 className='h-4 w-4' /> Saved
          </span>
        ) : isRecording ? (
          <span className='flex items-center gap-2 text-red-600'>
            <MicOff className='h-4 w-4' /> Stop Recording
          </span>
        ) : (
          <span className='flex items-center gap-2'>
            <Mic className='h-4 w-4' /> Record Answer
          </span>
        )}
      </Button>

      {/* Live answer preview */}
      {userAnswer ? (
        <div className='w-full max-w-md bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 mt-2'>
          <p className='font-semibold text-gray-400 text-xs mb-1 uppercase tracking-wide'>Your Answer</p>
          <p>{userAnswer}</p>
        </div>
      ) : null}

    </div>
  );
}

export default RecordAnswerSection;