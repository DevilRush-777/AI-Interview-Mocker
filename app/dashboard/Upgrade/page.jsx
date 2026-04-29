"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, Zap, Crown, Star, Sparkles, Lock } from 'lucide-react'

const plans = [
    {
        name: "Free",
        price: "₹0",
        period: "forever",
        icon: <Star className="h-6 w-6 text-gray-500" />,
        badge: null,
        description: "Perfect to get started with AI mock interviews.",
        color: "border-gray-200",
        buttonLabel: "Current Plan",
        buttonStyle: "border border-gray-300 text-gray-500 cursor-not-allowed",
        disabled: true,
        features: [
            "3 mock interviews per month",
            "5 AI-generated questions per interview",
            "Basic AI feedback & rating",
            "Webcam + microphone support",
            "View past interview results",
        ],
        locked: [],
    },
    {
        name: "Pro",
        price: "₹299",
        period: "per month",
        icon: <Zap className="h-6 w-6 text-indigo-600" />,
        badge: "Most Popular",
        badgeColor: "bg-indigo-100 text-indigo-700",
        description: "For serious job seekers who want unlimited practice.",
        color: "border-indigo-500 ring-2 ring-indigo-300",
        buttonLabel: "Upgrade to Pro",
        buttonStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
        disabled: false,
        features: [
            "Unlimited mock interviews",
            "Up to 10 questions per interview",
            "Detailed AI feedback & improvement tips",
            "Priority question generation",
            "Download feedback as PDF",
            "Email summary after every interview",
        ],
        locked: [],
    },
    {
        name: "Elite",
        price: "₹699",
        period: "per month",
        icon: <Crown className="h-6 w-6 text-yellow-500" />,
        badge: "Best Value",
        badgeColor: "bg-yellow-100 text-yellow-700",
        description: "For power users and interview coaching professionals.",
        color: "border-yellow-400 ring-2 ring-yellow-200",
        buttonLabel: "Upgrade to Elite",
        buttonStyle: "bg-yellow-500 hover:bg-yellow-600 text-white",
        disabled: false,
        features: [
            "Everything in Pro",
            "Custom question sets by role",
            "Industry-specific question banks",
            "AI voice tone & confidence analysis",
            "1-on-1 interview coach (coming soon)",
            "Priority support",
            "Early access to new features",
        ],
        locked: [],
    },
]

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Hired at Google",
        text: "MockMind AI helped me prep for 3 rounds in 2 weeks. The AI feedback was incredibly specific and helped me fix gaps I didn't even know I had.",
        avatar: "PS",
        color: "bg-indigo-100 text-indigo-700",
    },
    {
        name: "Arjun Mehta",
        role: "Software Engineer at Flipkart",
        text: "The Pro plan was worth every rupee. Being able to practice unlimited times before my interviews gave me so much confidence.",
        avatar: "AM",
        color: "bg-purple-100 text-purple-700",
    },
    {
        name: "Sneha Patel",
        role: "Frontend Dev at Razorpay",
        text: "I loved the instant ratings and the expected answers. It felt like having a real coach reviewing every response.",
        avatar: "SP",
        color: "bg-yellow-100 text-yellow-700",
    },
]

function UpgradePage() {
    const router = useRouter()
    const [clicked, setClicked] = useState(null)

    const handleUpgrade = (plan) => {
        setClicked(plan)
        setTimeout(() => {
            alert(`Payment integration coming soon for ${plan} plan! 🚀`)
            setClicked(null)
        }, 400)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            <div className="max-w-5xl mx-auto px-4 py-14">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                        <Sparkles className="h-3.5 w-3.5" /> Upgrade Your Plan
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                        Unlock the Full Power of <span className="text-indigo-700">MockMind AI</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        Choose a plan that matches your interview prep goals. Upgrade anytime, cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative bg-white rounded-2xl border-2 p-7 shadow-sm flex flex-col ${plan.color} transition-all hover:shadow-lg`}>
                            {plan.badge && (
                                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full ${plan.badgeColor}`}>
                                    {plan.badge}
                                </span>
                            )}

                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border">
                                    {plan.icon}
                                </div>
                                <span className="text-lg font-bold text-gray-800">{plan.name}</span>
                            </div>

                            <div className="mb-1">
                                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                <span className="text-gray-400 text-sm ml-2">/ {plan.period}</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                            <ul className="space-y-2.5 mb-8 flex-1">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                                {plan.locked.map((f, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                                        <Lock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                disabled={plan.disabled}
                                onClick={() => !plan.disabled && handleUpgrade(plan.name)}
                                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${plan.buttonStyle} ${clicked === plan.name ? 'scale-95 opacity-80' : ''}`}
                            >
                                {plan.buttonLabel}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="mb-14">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <span className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                                        {t.avatar}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                                        <p className="text-gray-400 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center bg-indigo-600 rounded-2xl p-10 text-white">
                    <Sparkles className="h-8 w-8 mx-auto mb-3 text-indigo-200" />
                    <h2 className="text-2xl font-bold mb-2">Still on the fence?</h2>
                    <p className="text-indigo-200 mb-6">Try our free plan first — no credit card required.</p>
                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-8 py-3 rounded-xl"
                    >
                        Start for Free
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default UpgradePage