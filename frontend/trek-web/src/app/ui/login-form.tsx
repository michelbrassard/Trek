"use client"

import InputField from "./form/input-field";
import TrekLogo from '../ui/trek-logo';
import InputSubmit from "./form/input-submit";

export default function LoginForm() {
    return(
        <div className="flex flex-col gap-3 p-3">
            <h1 className="text-4xl font-bold m-2 antialiased text-center">Log in</h1>
            <div className="flex items-center justify-center">
                <TrekLogo />
            </div>
            <form className="flex flex-col gap-2 mt-3">
                <InputField type="email" name="email" id="email" label="email" onChange={() => console.log("validate")}/>
                <InputField type="password" name="password" id="password" label="password" onChange={() => console.log("validate")}/>
                <div className="flex flex-col gap-3">
                    <InputSubmit name="submit" id="submit" value="Log in" />
                    <hr className="bg-neutral-400 dark:bg-neutral-600"></hr>
                    <button onClick={() => {
                            //
                        }
                    }>
                        <div className=' bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700  transition-colors w-full p-3 rounded-2xl flex justify-center items-center gap-1'>
                            Log in with Google
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
}