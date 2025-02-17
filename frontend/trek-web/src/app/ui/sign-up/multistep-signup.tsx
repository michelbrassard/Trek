"use client"

import Link from "next/link"
import { ArrowLeft } from 'lucide-react';
import RolePanel from '../../ui/sign-up/role-panel';
import { useState } from "react";

export default function MultiStepSignUp() {
    const [role, setRole] = useState(0)
    const [step, setStep] = useState("choose-role")
    
    const handleClick = (id: number, step: string) => {
        setRole(id);
        setStep(step)
    };


    return(
        <div>
            {step === "choose-role" && (
                <div className="p-3 m-1">
                <Link href="/">
                    <div className='mx-5 md:mx-0 md:m-2 hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl flex items-center gap-1'>
                      <ArrowLeft size={18}/> Home
                    </div>
                </Link>
                <div className='md:m-2'>
                  <h1 className='text-4xl font-bold text-center my-2'>Choose a role</h1>
                  <div className='text-center'>Choose a role before signing up to the platform...</div>
                  <div className='flex flex-col md:flex-row gap-5 mt-8 mx-5 md:mx-0'>
                    <button className="text-left" onClick={() => handleClick(0, "sign-up")}>
                        <RolePanel title='Coach' description='description' image=''/>
                    </button>
                    <button className="text-left" onClick={() => handleClick(1, "add-coach-id")}>
                        <RolePanel title='Athlete' description='description' image=''/>
                    </button>
                    <button className="text-left" onClick={() => handleClick(2, "sign-up")}>
                        <RolePanel title='Independent' description='description' image=''/>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === "add-coach-id" && (
                <div className="p-3 m-1">
                    <h2 className="text-xl">Add Coach ID</h2>
                    <button onClick={() => setStep("choose-role")}>Back</button>
                    <button onClick={() => setStep("sign-up")}>Sign up</button>
                </div>
            )}
            {step === "sign-up" && (
                <div className="p-3 m-1">
                    <h2 className="text-xl">Sign up</h2>
                    <button onClick={() => setStep("choose-role")}>Back</button>
                    <Link href="/dashboard">Dashboard</Link>
                </div>
            )}
        </div>
        
    )
}