import InputField from "./input-field";
import TrekLogo from '../ui/trek-logo';
import InputSubmit from "./input-submit";

export default function LoginForm() {
    return(
        <div className="flex flex-col gap-3 p-3">
            <h1 className="text-4xl font-bold m-2 antialiased text-center">Log in</h1>
            <div className="flex items-center justify-center">
                <TrekLogo />
            </div>
            <form className="flex flex-col gap-2 mt-3">
                <InputField type="email" name="email" id="email" label="email" />
                <InputField type="password" name="password" id="password" label="password" />
                <InputSubmit name="submit" id="submit" value="Log in" />
            </form>
        </div>
    )
}