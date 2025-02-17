import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import Link from "next/link"
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center md:h-screen p-3">
      <div className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-2xl md:w-[400px] w-full">
        <Link href="/">
          <div className='hover:bg-neutral-200 hover:dark:bg-neutral-800  transition-colors w-fit p-2 rounded-xl'>
            <ArrowLeft size={20}/>
          </div>
        </Link>
        <LoginForm />
        <p className='p-1 text-sm text-center'>
          Don&apos;t have an account?  
          <Link href="/signup" className='px-1 font-medium hover:underline text-blue-500'>Sign up</Link>
        </p>
        
      </div>
    </main>
  );
}