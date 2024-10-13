'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {

  const router = useRouter();

  const handleClick = () => {
    router.push('../personal_area');
  }

  return (
    <div className="absoute w-full border-b border-b-slate-600">
      <div className="flex flex-row justify-between items-center min-h-16 px-5 py-7">
        <div className="mx-14 flex flex-row">
          <img src="/icons/fast_feedback_logo.svg" alt="Logo" className="" width={57} height={57} />
          <div className="hidden md:flex"><span className='font-extrabold text-4xl bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3'>Fast</span>
            <span className='font-extrabold text-4xl text-[#FFAF00]'>Feedback</span></div>
        </div>
        <div className="hidden md:flex flex-row justify-between ">
          <div className="h-[30px] w-[90px] scale-125 text-black bg-gradient-to-r from-[#EBF400] to-[#FFAF00] mx-5 rounded-xl flex flex-col items-center justify-center transition transform hover:scale-150 duration-300 cursor-pointer"><span className='font-semibold' onClick={handleClick}>Sign In</span></div>
          <div className="h-[30px] w-[90px] scale-125 text-black bg-gradient-to-r from-[#EBF400] to-[#FFAF00] mx-5 rounded-xl flex flex-col items-center justify-center transition transform hover:scale-150 duration-300 cursor-pointer"><span className='font-semibold' onClick={handleClick}>Sign Up</span></div>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger><div className="px-5 md:hidden">
              <img src='./icons/hamburger.svg' width={47} height={47} />
            </div></SheetTrigger>
            <SheetContent className='bg-[#151719] w-[250px] border-0'>
              <div className="flex flex-col gap-5 items-center">
                <img src="/icons/fast_feedback_logo.svg" alt="Logo" className="" width={57} height={57} />
                <div className="h-[30px] w-[90px] scale-125 text-black bg-gradient-to-r from-[#EBF400] to-[#FFAF00] mx-5 rounded-xl flex flex-col items-center justify-center transition transform hover:scale-150 duration-300 cursor-pointer"><span className='font-semibold' onClick={handleClick}>Sign In</span></div>
                <div className="h-[30px] w-[90px] scale-125 text-black bg-gradient-to-r from-[#EBF400] to-[#FFAF00] mx-5 rounded-xl flex flex-col items-center justify-center transition transform hover:scale-150 duration-300 cursor-pointer"><span className='font-semibold' onClick={handleClick}>Sign Up</span></div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default Navbar