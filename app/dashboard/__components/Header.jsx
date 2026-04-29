"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { BrainCircuit } from 'lucide-react'
import Link from 'next/link'

function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>

            {/* Brand Logo */}
            <Link href="/dashboard" className='flex items-center gap-2'>
                <BrainCircuit className='h-7 w-7 text-indigo-600' />
                <span className='text-xl font-extrabold tracking-tight'>
                    <span className='text-indigo-700'>MockMind</span>
                    <span className='text-gray-700'> AI</span>
                </span>
            </Link>

            <ul className='flex gap-6'>
                <li><Link href="/dashboard" className={`hover:text-indigo-700 hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-indigo-700 font-bold'}`}>Dashboard</Link></li>
                <li><Link href="/dashboard/Questions" className={`hover:text-indigo-700 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/Questions' && 'text-indigo-700 font-bold'}`}>Questions</Link></li>
                <li><Link href="/dashboard/Upgrade" className={`hover:text-indigo-700 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/Upgrade' && 'text-indigo-700 font-bold'}`}>Upgrade</Link></li>
                <li><Link href="/dashboard/how" className={`hover:text-indigo-700 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-indigo-700 font-bold'}`}>How it Works?</Link></li>
            </ul>

            <UserButton />
        </div>
    )
}

export default Header