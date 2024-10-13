import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="w-full border-t border-t-slate-600 min-h-[140px] flex flex-col justify-center mt-10">
            <div className="flex flex-row justify-center gap-10">
                <div className="flex flex-row ml-14">
                    <img src='./icons/fast_feedback_logo.svg' width={57} height={57} />
                    <div className="hidden md:flex">
                        <span className='font-extrabold text-4xl bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3'>Fast</span>
                        <span className='font-extrabold text-4xl text-[#FFAF00]'>Feedback</span>
                    </div>
                </div>
                <div className="flex flex-row relative bottom-1"><span className='text-white text-xl font-extrabold flex flex-col justify-center'>Made with</span>
                    <img src='./landing_page/heart.svg' width={20} height={20} className='mx-1' />
                    <span className='text-white text-xl font-extrabold flex flex-col justify-center'>by Armaan</span>
                    <Link href='https://www.linkedin.com/in/armaan-raj-a73372268/'><img src='./landing_page/linkedin.svg' width={20} height={20} className='mx-1'/></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer