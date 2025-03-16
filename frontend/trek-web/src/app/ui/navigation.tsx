'use client'

import Link from "next/link"
import TrekLogo from "./trek-logo";
import { AlignRight, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
    const baseLinkStyle = 'py-2 px-4 font-medium hover:underline'
    const signUpStyle = 'text-white font-medium mx-4 py-2 px-4 rounded-xl transition-colors bg-blue-500 hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600'
    const mobileLinkStyle = "text-3xl font-medium hover:underline"
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return(
        <nav className="p-3 md:p-0">
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-row justify-between">
          <div className="p-2">
            <TrekLogo size={35} color="fill-neutral-500" />
          </div>
          <button onClick={toggleMenu}>
            <div className="inline-block text-neutral-400 dark:text-neutral-600 hover:dark:bg-neutral-900 hover:bg-neutral-100 hover:dark:text-neutral-100 hover:text-neutral-800 transition-colors px-3 py-2.5 rounded-xl">
              <AlignRight size={30}/>
            </div>
          </button>
        </div>

        {/*  */}
        <div className={`md:hidden backdrop-blur-md p-5 fixed inset-0 bg-neutral-200 dark:bg-neutral-800 bg-opacity-80 z-50 transition-all transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col justify-between">
            <div className="mb-10">
              <button onClick={toggleMenu} className="float-right p-2">
                <X size={35}/>
              </button>
            </div>
            
            <div className="flex flex-col gap-10 py-5 px-10">
              <Link href="/" className={mobileLinkStyle} onClick={toggleMenu}>Home</Link>
              <Link href="/about" className={mobileLinkStyle} onClick={toggleMenu}>About</Link>
              <hr className="border-neutral-300 dark:border-neutral-600 border-t-2"></hr>
              <Link href="/login" className={mobileLinkStyle} onClick={toggleMenu}>Log in</Link>
              <Link href="/signup" className={mobileLinkStyle} onClick={toggleMenu}>Sign up</Link>
            </div>
          </div>
          
          
        </div>
        
        {/* Desktop Navigation */}
        <div className="md:flex flex-row justify-between p-3 hidden items-center">
          <Link href="/" className = {baseLinkStyle}>
            <div className="flex items-center justify-center">
              <TrekLogo size={40} color="fill-neutral-500" />
            </div>
          </Link>
          <div className="flex flex-row gap-8">
            <Link href="/" className = {baseLinkStyle}>Home</Link>
            <Link href="/about" className = {baseLinkStyle}>About</Link>
            <div className="flex flex-row gap-2">
              <Link href="/login" className = {baseLinkStyle}>Log in</Link>
              <div className="w-[2px] bg-neutral-200 dark:bg-neutral-800"></div>
              <Link href="/signup" className = {signUpStyle}>Sign up</Link>
            </div>
          </div>
        </div>
        
      </nav>
    );
}