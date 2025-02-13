import TrekLogo from '../ui/trek-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import Link from "next/link"
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center md:h-screen">
        <Link href="/">
            <ArrowLeft size={20}/>
        </Link>
      <div className="">
        <TrekLogo />
        <LoginForm />
        <Link href="/signup">Sign up</Link>
      </div>
    </main>
  );
}