import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from './ui/use-toast'



const Lister_Card = ({ name , uid}: { name: string , uid:string}) => {
    const router = useRouter();
    const to = name;
    const area_name  =  name; 
    const {toast} = useToast(); 
    const handleClick = () => {
        router.push(`../area_page/${to}/?name=${name}`);
    }

    const handleDelete = async()=>{
        const response = await fetch('./api/user_areas_api/delete' , {
            method:'DELETE', 
            headers:{
                'Content-type' : 'application.json', 
            }, 
            body: JSON.stringify({area_name})
        })
        if(response.ok){
            toast({
                title: "Area deleted",
                description: "The page will referesh soon",
            })
            setTimeout(()=>{
                sessionStorage.removeItem(`saved_areas_${uid}`);
                window.location.reload();
            } , 2000);
        }
        else{
            toast({
                variant:"destructive", 
                title:'Operation not successful', 
                description:'Please try again'
            })
        }
    }

    return (
        <div className="flex flex-col justify-between items-center w-[350px] h-[210px] bg-[#080202] py-4 px-1 rounded-lg m-4">
            <h1 className='text-2xl font-bold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent'>{to}</h1>
            <div className="flex flex-col items-center gap-4">
                <div className="">
                    <Button className='bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black font-bold transition transform hover:scale-110 duration-300' onClick={handleClick}>Go to your Area</Button>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Button className='bg-red-500  hover:bg-red-800 transition transform hover:scale-110 duration-300'>Delete</Button>
                    </DialogTrigger>
                    <DialogContent className='bg-[#151719] text-white'>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                Do you really want to delete this area.This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center">
                            <Button className='bg-red-500  hover:bg-red-800 transition transform hover:scale-110 duration-300 max-w-[70px]' onClick={handleDelete}>Delete</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Lister_Card