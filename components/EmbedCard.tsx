import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useToast } from './ui/use-toast'

interface EmbedCardInterface {
  area_name: string,
  color: string,
  bgColor: string,
  textColor: string
}

const EmbedCard = ({ area_name, color, bgColor, textColor }: EmbedCardInterface) => {4

  const full_url = new URLSearchParams({
    name:area_name, 
    color:color, 
    bgColor:bgColor, 
    textColor:textColor
  }).toString(); 


  const link = `${process.env.NEXT_PUBLIC_EMBED_BASE_URL}?${full_url}`
  const toast = useToast(); 

  const embed_string = `<iframe src="${link}" ></iframe>`

  return (
    <div className="flex flex-col sm:flex-row border-2 border-[#FFAF00] m-4 p-4 rounded-lg">
      <div className="bg-black text-white text-wrap">
        <ScrollArea className="h-[140px] w-[350px] rounded-md border-2 border-[#EBF400] p-4">
          {`<iframe src="${link}" ></iframe>`}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="flex flex-col justify-center">
        <Button className='bg-gradient-to-r from-[#EBF400] to-[#FFAF00] m-4 text-black font-bold transition transform hover:scale-110 duration-300' onClick={()=>{navigator.clipboard.writeText(embed_string)}}>Copy Embed</Button>
      </div>
    </div>
  )
}

export default EmbedCard