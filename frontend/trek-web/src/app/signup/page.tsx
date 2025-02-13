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
    <main className="flex-1 flex flex-col items-center justify-center md:h-screen">
      <Link href="/">
        <ArrowLeft size={20}/>
      </Link>
      <div className="">
        <TrekLogo />
        <SignupForm />
        <Link href="/login">Log in</Link>
      </div>
    </main>
  );
}