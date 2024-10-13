import React from 'react'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
    return (
        <div className="absoute w-full">
            <div className="flex flex-row justify-between items-center min-h-16 px-5 py-7">
                <div className="mx-14 flex flex-row">
                    <img src="/icons/fast_feedback_logo.svg" alt="Logo" className="" width={57} height={57} />
                    <div className="hidden md:flex">
                        <span className='font-extrabold text-4xl bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3'>Fast</span>
                        <span className='font-extrabold text-4xl text-[#FFAF00]'>Feedback</span>
                    </div>
                </div>
                <div className="mb-4 mr-10"><UserButton /></div>
            </div>
        </div>
    )
}

export default Header
