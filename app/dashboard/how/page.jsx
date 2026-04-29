"use client"
import React from 'react'
import { BrainCircuit, Mic, Star, FileText, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const steps = [
    {
        icon: <FileText className="h-8 w-8 text-indigo-600" />,
        step: "Step 1",
        title: "Create Your Interview",
        description:
            "Enter your target job role, tech stack or job description, and your years of experience. MockMind AI will instantly generate a set of tailored interview questions just for you.",
        color: "bg-indigo-50 border-indigo-200",
        badge: "bg-indigo-100 text-indigo-700",
    },
    {
        icon: <Mic className="h-8 w-8 text-purple-600" />,
        step: "Step 2",
        title: "Record Your Answers",
        description:
            "Enable your webcam and microphone. Answer each question by clicking \"Record Answer\" — your speech is transcribed in real-time. Navigate between questions using the Next button.",
        color: "bg-purple-50 border-purple-200",
        badge: "bg-purple-100 text-purple-700",
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-blue-600" />,
        step: "Step 3",
        title: "Get AI Feedback",
        description:
            "After finishing, click \"End Interview\". Our AI analyses each answer and provides a rating out of 10, personalised feedback, and the ideal expected answer — all in seconds.",
        color: "bg-blue-50 border-blue-200",
        badge: "bg-blue-100 text-blue-700",
    },
    {
        icon: <Star className="h-8 w-8 text-yellow-500" />,
        step: "Step 4",
        title: "Review & Improve",
        description:
            "Visit your Dashboard anytime to revisit past interviews, re-read AI feedback, and compare your answers to the expected ones. Track how you improve over time.",
        color: "bg-yellow-50 border-yellow-200",
        badge: "bg-yellow-100 text-yellow-700",
    },
]

const faqs = [
    {
        q: "Is my webcam video recorded or stored?",
        a: "No. We never record or store your video. The webcam feed is only used locally in your browser to simulate a real interview setting.",
    },
    {
        q: "How does the AI generate questions?",
        a: "We use Google Gemini AI to generate relevant, role-specific interview questions based on your job title, tech stack, and experience level.",
    },
    {
        q: "Can I retake an interview?",
        a: "Yes! You can click Start on any previous interview card on the Dashboard to redo it and get a fresh set of feedback.",
    },
    {
        q: "How is the rating calculated?",
        a: "The AI rates your answer out of 10 based on relevance, accuracy, clarity, and completeness compared to the expected answer.",
    },
]

function HowItWorks() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-14">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                        How It Works
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                        Ace Your Next Interview with <span className="text-indigo-700">MockMind AI</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        A simple 4-step process to practise, get feedback, and land your dream job.
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-6 mb-16">
                    {steps.map((s, i) => (
                        <div key={i} className={`flex gap-6 items-start border rounded-2xl p-6 ${s.color} transition-all hover:shadow-md`}>
                            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                {s.icon}
                            </div>
                            <div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.badge}`}>{s.step}</span>
                                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">{s.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <ChevronRight className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{faq.q}</p>
                                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-indigo-600 rounded-2xl p-10 text-white">
                    <h2 className="text-2xl font-bold mb-2">Ready to practise?</h2>
                    <p className="text-indigo-200 mb-6">Create your first AI mock interview in under a minute.</p>
                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-8 py-3 rounded-xl"
                    >
                        Go to Dashboard
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HowItWorks