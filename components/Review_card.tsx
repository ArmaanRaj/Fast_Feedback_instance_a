'use client'

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from './ui/button'
import { toast, useToast } from './ui/use-toast'

interface props {
    user_name: string,
    user_email_id: string,
    review: string,
    area_name: string,
    mode: number
}

const Review_card = ({ user_name, user_email_id, review, area_name, mode }: props) => {

    const handleLike = async () => {
        const response = await fetch('../../../../api/user_reviews_api/like', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ user_email_id, area_name })
        })
        if (response.ok) {
            sessionStorage.removeItem(`liked_text_${area_name}`)
            toast({
                title: 'Review embedded successfully',
                description: 'You can access them in embedded text reviews section'
            })
        }
        else {
            toast({
                variant: 'destructive',
                title: 'Internal sever error',
                description: 'please try again'
            })
        }
    }

    const handleRemove = async()=>{
        const response = await fetch('../../../../api/user_reviews_api/remove' , {
            method:'POST', 
            headers:{
                'Content-type' : 'application/json'
            }, 
            body:JSON.stringify({user_email_id , area_name})
        })
        if(response.ok){
            sessionStorage.removeItem(`liked_text_${area_name}`)
            toast({
                title:'Embed removed successfully', 
                description:'This page will reload in 2 seconds'
            })
            setTimeout(()=>{
                window.location.reload();
            } , 2000);
        }
        else{
            toast({
                variant:'destructive', 
                title:'Could not remove embed', 
                description:'Please try again'
            })
        }
    }


    return (
        <div className="flex flex-col justify-start items-center w-[330px] h-[330px] bg-[#080202] m-4 border-2 border-[#EBF400] rounded-lg p-4">
            <div className="flex flex-col items-center justify-start">
                <h1 className='text-2xl font-bold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent my-2'>
                    {user_name}
                </h1>
                <span className='text-base font-normal my-2 bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent '>{user_email_id}</span>
                <ScrollArea className="rounded-md p-4 text-white h-40">
                    {review}
                </ScrollArea>
            </div>
            {mode == 1 ? <Button className='bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black text-base font-bold' onClick={handleLike}>Embed this review</Button> :
                <div><Button className='bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black text-base font-bold' onClick={handleRemove}>Remove this embed</Button></div>}
        </div>
    )
}


export default Review_card

