import { Metadata } from 'next';
import Link from "next/link"
import MultiStepSignUp from '../ui/sign-up/multistep-signup';

export const metadata: Metadata = {
  title: 'Sign Up',
};
 
export default function SignupPage() {
  //const [role, setRole] = useState(1)

  return (
    <main className="flex-1 flex flex-col md:items-center md:h-screen mt-10 mb-10 md:mb-0">
      <MultiStepSignUp />
      <p className='p-1 text-sm text-center'>
          Already have an account?  
          <Link href="/login" className='px-1 font-medium hover:underline text-blue-500'>Log in</Link>
        </p>
    </main>
  );
}

