"use client"

import InputField from "./form/input-field";
import TrekLogo from '../ui/trek-logo';
import InputSubmit from "./form/input-submit";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/dashboard");
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
                    <hr className="bg-neutral-400 dark:bg-neutral-600"></hr>
                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700 transition-colors w-full p-3 rounded-2xl flex justify-center items-center gap-1">
                        Log in with Google
                    </button>
                </div>
            </form>
        </div>
    )
}