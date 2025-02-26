"use client"

import InputField from "./form/input-field";
import TrekLogo from '../ui/trek-logo';
import InputSubmit from "./form/input-submit";
// import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await axios.post(
              'http://localhost:8000/auth/login/',
              { email, password },
              { withCredentials: true } // Include credentials (cookies)
            );
            //sessionStorage.setItem("role", response.data.user.role)
            router.push('/dashboard');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
              setError(error.response.data.error || 'Login failed');
            } else {
              setError('An error occurred.');
            }
          }
    };

    return(
        <div className="flex flex-col gap-3 p-3">
            <h1 className="text-4xl font-bold m-2 antialiased text-center">Log in</h1>
            <div className="flex items-center justify-center">
                <TrekLogo />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3">
                <InputField 
                    type="email" 
                    name="email" 
                    id="email" 
                    label="email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField 
                    type="password" 
                    name="password" 
                    id="password" 
                    label="password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex flex-col gap-3">
                    <InputSubmit name="submit" id="submit" value="Log in" />
                    <hr className="border border-neutral-300 dark:border-neutral-700"></hr>
                    <button
                        type="button"
                        //onClick={() => signIn("google")}
                        className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700 transition-colors w-full p-3 rounded-2xl flex justify-center items-center gap-1">
                        Log in with Google
                    </button>
                </div>
            </form>
        </div>
    )
}