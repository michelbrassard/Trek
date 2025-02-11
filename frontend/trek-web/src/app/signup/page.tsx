import TrekLogo from '../ui/trek-logo';
import SignupForm from '@/app/ui/signup-form';
import { Metadata } from 'next';
import Link from "next/link"
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign Up',
};
 
export default function SignupPage() {
  return (
    <main className="flex-1 flex items-center justify-center md:h-screen">
      <Link href="/">
        <ArrowLeft size={20}/>
        </Link>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <TrekLogo />
          </div>
        </div>
        <SignupForm />
        <Link href="/login">Log in</Link>
      </div>
    </main>
  );
}