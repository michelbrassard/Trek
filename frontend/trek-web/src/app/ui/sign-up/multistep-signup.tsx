"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RolePanel from '../../ui/sign-up/role-panel';
import { useState } from "react";
import InputField from "../form/input-field";

//Separate this into multiple components
export default function MultiStepSignUp() {
    const [role, setRole] = useState("independent");
    const [step, setStep] = useState("choose-role");
    const [coachID, setCoachID] = useState("")
    const [isCoachIDEmpty, setCoachIDState] = useState(false)
    const [alertCoachID, setAlertCoachID] = useState("")
    
    const handleClick = (role: string, step: string) => {
        setRole(role);
        setStep(step)
    };


    return(
        <form className="p-3">
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
                    <button className="text-left" onClick={() => handleClick("coach", "sign-up")}>
                        <RolePanel title='Coach' description='description' image=''/>
                    </button>
                    <button className="text-left" onClick={() => handleClick("athlete", "add-coach-id")}>
                        <RolePanel title='Athlete' description='description' image=''/>
                    </button>
                    <button className="text-left" onClick={() => handleClick("independent", "sign-up")}>
                        <RolePanel title='Independent' description='description' image=''/>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === "add-coach-id" && (
                <div className="p-3 m-1 flex flex-col gap-3 bg-neutral-100 dark:bg-neutral-900 md:w-[400px] w-full rounded-3xl">
                    <button onClick={() => {
                            setCoachID("")
                            setStep("choose-role");
                        }
                    }>
                        <div className='mx-5 md:mx-0 hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl flex items-center gap-1'>
                            <ArrowLeft size={18}/> Choose a role
                        </div>
                    </button>
                    <h2 className="text-2xl font-bold">Add Coach ID</h2>
                    <p>
                        Current role: 
                        <span className="capitalize font-bold"> {role}</span>
                    </p>
                    <InputField 
                        type={"text"} 
                        name={"coach-id"} 
                        id={"coach-id"} 
                        label={"coach id"} 
                        value={coachID}
                        hasProblems={isCoachIDEmpty}
                        onChange={(e) => setCoachID(e.target.value)}
                        alertMessage={alertCoachID}
                    />
                    <p className="text-xs text-neutral-400 dark:text-neutral-600 px-2">The special coach id should be given to you here...</p>
                    <div>
                        <button onClick={() => {
                                if (coachID.length === 0) {
                                    setCoachIDState(true)
                                    setAlertCoachID("Provide a coach ID before sign up or change the role.")
                                }
                                else {
                                    setCoachIDState(false)
                                    setAlertCoachID("")
                                    setStep("sign-up");
                                }
                            }
                            } className="w-fit float-right">
                            <div className='mx-5 md:mx-0 hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl flex items-center gap-1'>
                                Go to Sign Up <ArrowRight size={18}/> 
                            </div>
                        </button>
                    </div>
                </div>
            )}
            {step === "sign-up" && (
                <div className="p-3 m-1 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">Sign up</h2>
                    <p className="capitalize">{role}</p>

                    {role === "athlete" && (
                        <div>
                            <button onClick={() => setStep("add-coach-id")}>Change coach ID</button>
                            <p>Coach ID: {coachID}</p>
                        </div>
                    )}

                    <button onClick={() => {
                            setCoachID("")
                            setStep("choose-role")
                        }
                    }>Back</button>
                    <Link href="/dashboard">Dashboard</Link>
                    
                </div>
            )}
        </form>
        
    )
}