'use client'

import Review_card from '@/components/Review_card'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from 'uuid';


interface review_object {
  user_email_id: string,
  user_name: string,
  review: string,
  liked: number,
  area_name: string,
}


const Page = () => {

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<review_object[]>([]);
  const area_name = searchParams.get('name');
  const [isLoaded, setisLoaded] = useState(false)

  useEffect(() => {
    handleLoad();
  }, [])


  const handleLoad = async () => {
    const area_name = searchParams.get('name');
    const storedReviews = sessionStorage.getItem(`str-${area_name}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
      setisLoaded(true);
    }
    else {
      const response = await fetch('../../../api/user_reviews_api/peek', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ area_name: area_name })
      });
      if (response.ok) {
        const result = await response.json();
        setReviews(result.result);
        sessionStorage.setItem(`str-${area_name}`, JSON.stringify(result.result));
        setisLoaded(true);
      }
      else {
        toast({
          variant: 'destructive',
          title: 'Failed to load',
        })
      }
    }
  }

  return (
    <div className="">
      <h1 className="font-extrabold text-white text-5xl text-center">All text reviews :</h1>
      <div className="flex flex-row justify-center mt-3 p-2">
        {isLoaded == true ? <div className="grid lg:grid-cols-3 md:grid-cols-2 es:grid-cols-1 gap-4">
          {reviews.map((index) => (
            <Review_card
              user_name={index.user_name}
              user_email_id={index.user_email_id}
              review={index.review}
              area_name={area_name!}
              mode={1}
              key={uuidv4()}
            />
          ))}
        </div> : <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>}
      </div>
    </div>
  )
}

export default Page