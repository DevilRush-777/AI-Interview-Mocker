"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star, Home, Trophy, MessageSquare, CheckCircle2, User, ChevronDown, ChevronUp } from 'lucide-react';

function StarRating({ rating }) {
    const max = 10;
    const filled = Math.round(Number(rating));
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    );
}

function RatingBadge({ rating }) {
    const r = Number(rating);
    let color = 'bg-red-100 text-red-700';
    if (r >= 8) color = 'bg-green-100 text-green-700';
    else if (r >= 5) color = 'bg-yellow-100 text-yellow-700';
    return <span className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>{rating}/10</span>;
}

function FeedbackCard({ item, index }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="flex items-start justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setOpen(prev => !prev)}>
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center">{index + 1}</span>
                    <div className="min-w-0">
                        <p className="font-medium text-gray-800 leading-snug">{item.Question}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <RatingBadge rating={item.rating} />
                            <StarRating rating={item.rating} />
                        </div>
                    </div>
                </div>
                {open ? <ChevronUp className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />}
            </div>
            {open && (
                <div className="border-t bg-gray-50 divide-y">
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">AI Feedback</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.feedback || 'No feedback available.'}</p>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-orange-400" />
                            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">Your Answer</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed bg-orange-50 rounded-lg p-3 border border-orange-100">{item.userAns || 'No answer recorded.'}</p>
                    </div>
                    {item.correctAns && (
                        <div className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Expected Answer</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed bg-green-50 rounded-lg p-3 border border-green-100">{item.correctAns}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function FeedbackPage() {
    const params = useParams();
    const router = useRouter();
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { GetFeedback(); }, []);

    const GetFeedback = async () => {
        setLoading(true);
        try {
            const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);
            setFeedbackList(result);
        } catch (err) {
            console.error('Error fetching feedback:', err);
        } finally {
            setLoading(false);
        }
    };

    const averageRating = feedbackList.length > 0
        ? (feedbackList.reduce((sum, item) => sum + Number(item.rating || 0), 0) / feedbackList.length).toFixed(1)
        : null;

    const getRatingLabel = (avg) => {
        if (avg >= 8) return { label: 'Excellent', color: 'text-green-600' };
        if (avg >= 6) return { label: 'Good', color: 'text-yellow-600' };
        if (avg >= 4) return { label: 'Average', color: 'text-orange-500' };
        return { label: 'Needs Improvement', color: 'text-red-600' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                        <Trophy className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Interview Complete!</h1>
                    <p className="text-gray-500 mt-2">Here is your personalised AI feedback</p>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-purple-300 border-t-purple-600 animate-spin" />
                        <p className="text-gray-500">Loading your feedback...</p>
                    </div>
                )}

                {!loading && feedbackList.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No answers recorded</p>
                        <p className="text-sm mt-1">Go back and record your answers to get AI feedback.</p>
                        <Button className="mt-6" onClick={() => router.push(`/dashboard/interview/${params.interviewId}/start`)}>Back to Interview</Button>
                    </div>
                )}

                {!loading && feedbackList.length > 0 && (
                    <>
                        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-8 mb-8 text-center">
                            <p className="text-sm text-gray-500 uppercase tracking-widest font-medium mb-3">Overall Performance</p>
                            <div className="text-6xl font-extrabold text-purple-600 mb-2">
                                {averageRating}<span className="text-2xl text-gray-400">/10</span>
                            </div>
                            {averageRating && (() => {
                                const { label, color } = getRatingLabel(Number(averageRating));
                                return <p className={`text-xl font-semibold ${color} mb-4`}>{label}</p>;
                            })()}
                            <StarRating rating={Math.round(Number(averageRating))} />
                            <p className="text-sm text-gray-400 mt-3">Based on {feedbackList.length} answered question{feedbackList.length !== 1 ? 's' : ''}</p>
                        </div>

                        <p className="text-sm text-gray-400 mb-3 text-center">Click a question to see detailed feedback</p>
                        <div className="space-y-4">
                            {feedbackList.map((item, index) => (
                                <FeedbackCard key={item.id} item={item} index={index} />
                            ))}
                        </div>

                        <div className="flex justify-center mt-10">
                            <Button size="lg" onClick={() => router.push('/dashboard')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl">
                                <Home className="h-5 w-5" />
                                Go to Dashboard
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FeedbackPage;