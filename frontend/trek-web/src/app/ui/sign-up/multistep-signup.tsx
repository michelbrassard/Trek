"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RolePanel from '../../ui/sign-up/role-panel';
import { useState } from "react";
import InputField from "../form/input-field";
import InputSubmit from "../form/input-submit";
import axios from 'axios';
import { useRouter } from "next/navigation";

//Separate this into multiple components?
export default function MultiStepSignUp() {
    const router = useRouter();
    const [step, setStep] = useState("choose-role");
    const [coachID, setCoachID] = useState("")
    const [isCoachIDEmpty, setCoachIDState] = useState(false)
    const [alertCoachID, setAlertCoachID] = useState("")

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [role, setRole] = useState("Independent");

    const [error, setError] = useState("");
    
    const handleClick = (role: string, step: string) => {
        setRole(role);
        setStep(step)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //VALIDATE AND SANITIZE
        if (password !== repeatPassword) {
            setError("Passwords need to be the same!");
            return;
         }

        const nameElements = fullName.split(" ")
        const first_name = nameElements[0]
        const last_name = nameElements.slice(1).join(" ");
        
        try {
            const response = await axios.post(
                'http://localhost:8000/auth/register/',
                { 
                    username, 
                    email, 
                    password, 
                    first_name, 
                    last_name, 
                    phone, 
                    "date_of_birth": dateOfBirth,
                    role
                },
                { withCredentials: true }
            );
            console.log(response)
            router.push('/dashboard');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any) {
            if (error.response) {
                setError(error.response.data.error || 'Sign up failed');
              } else {
                setError('An error occurred.');
              }
        }
        
    }


    return(
        <form 
            className="m-5 md:m-0 p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900" 
            onSubmit={handleSubmit}
        >
            {step === "choose-role" && (
                <div className="">
                <Link href="/">
                    <div className='text-blue-500 mx-5 md:mx-0 hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl flex items-center gap-1'>
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
                <div className="flex flex-col gap-3 md:w-[400px] w-full rounded-3xl">
                    <button onClick={() => {
                            setCoachID("")
                            setStep("choose-role");
                        }
                    }>
                        <div className='text-blue-500 mx-5 md:mx-0 hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl flex items-center gap-1'>
                            <ArrowLeft size={18}/> Choose a role
                        </div>
                    </button>

                    <div className="m-3 flex flex-col gap-3">
                        <h2 className="text-2xl font-bold">Add Coach ID</h2>
                        <p>
                            Role: 
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
                    </div>
                    
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
                            <div className='text-blue-500 mx-5 md:mx-0 hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl flex items-center gap-1'>
                                Go to Sign Up <ArrowRight size={18}/> 
                            </div>
                        </button>
                    </div>
                </div>
            )}
            {step === "sign-up" && (
                <div className="flex flex-col gap-2 md:w-[400px] w-full">
                    <div className="flex flex-row gap-3 justify-between">
                        <button onClick={() => {
                                setCoachID("")
                                setStep("choose-role")
                            }
                        }>
                            <div className='text-blue-500 hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl flex items-center gap-1'>
                                <ArrowLeft size={18}/> Change Role
                            </div>
                        </button>
                        <p className="p-2 text-right">
                            Role: 
                            <span className="capitalize font-bold"> {role}</span>
                        </p>
                    </div>
                    {role === "athlete" && (
                        <div className="flex flex-row text-sm">
                            <p className="p-2">Coach ID: <span className="font-bold">{coachID}</span></p>
                            <button onClick={() => setStep("add-coach-id")}>
                                <div className='text-blue-500 hover:underline w-fit'>
                                    Change
                                </div>
                            </button>
                            
                        </div>
                    )}

                    <div className="flex flex-col gap-3 px-3">
                        <h1 className="text-3xl font-bold text-center">Sign up</h1>
                        <InputField 
                            type={"text"} 
                            name={"full-name"} 
                            id={"full-name"} 
                            label={"full name"} 
                            onChange={(e) => setFullName(e.target.value)} 
                        />
                        <InputField 
                            type={"text"} 
                            name={"username"} 
                            id={"username"} 
                            label={"username"} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <InputField 
                            type={"email"} 
                            name={"email"} 
                            id={"email"} 
                            label={"email"} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField 
                            type={"text"} 
                            name={"phone"} 
                            id={"phone"} 
                            label={"phone"} 
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <InputField 
                            type={"date"} 
                            name={"date-of-birth"} 
                            id={"date-of-birth"} 
                            label={"date of birth"} 
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        
                        <div className="flex flex-row gap-2">
                            <InputField 
                                type={"password"} 
                                name={"password"} 
                                id={"password"} 
                                label={"password"} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputField 
                                type={"password"} 
                                name={"repeat-password"} 
                                id={"repeat-password"} 
                                label={"repeat password"} 
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <InputSubmit name="submit" id="submit" value="Sign up" />
                            <hr className="bg-neutral-400 dark:bg-neutral-600"></hr>
                            <p className="text-red-500">{error}</p>
                            <button onClick={() => {
                                    //go to google sign up
                                }
                            }>
                                <div className=' bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700  transition-colors w-full p-3 rounded-2xl flex justify-center items-center gap-1'>
                                    Sign up with Google
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <p className='p-1 mt-5 text-sm text-center'>
                Already have an account?  
                <Link href="/login" className='px-1 font-medium hover:underline text-blue-500'>Log in</Link>
            </p>
        </form>
        
    )
}