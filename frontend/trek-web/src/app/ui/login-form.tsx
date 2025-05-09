"use client"

import InputField from "./form/input-field";
import TrekLogo from './logo/trek-logo';
import InputSubmit from "./form/input-submit";
// import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import DOMPurify from "dompurify";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //VALIDATE AND SANITIZE
        //DOMPurify is not needed here?
        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedPassword = DOMPurify.sanitize(password);

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format");
            return;
        }
        if (!password || password.length < 4) {
            setError("Password must be at least 4 characters long");
            return;
        }

        try {
            await axios.post('http://localhost:8000/auth/login/',
              { email: sanitizedEmail, password: sanitizedPassword },
              { withCredentials: true }
            );
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
                <div className="flex row gap-2">
                    <TrekLogo size={28} color="fill-neutral-600 dark:fill-neutral-400" />
                    <p className="text-2xl text-neutral-600 dark:text-neutral-400">Trek</p>
                </div>
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