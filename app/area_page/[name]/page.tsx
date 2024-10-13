'use client'
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast} from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { HexColorPicker } from "react-colorful";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmbedCard from "@/components/EmbedCard";

//we should also display current form info

interface area_obj {
  site_name: string,
  site_url: string,
  user_name: string,
  user_id: string,
  q1: string,
  q2: string,
  q3: string,
}

const formSchema = z.object({
  site_url: z.string().url({
    message: "URL must be valid",
  }),
  user: z.string().min(1, {
    message: "Username cannot be empty",
  }),
  q1: z.string().min(1, {
    message: "Question field cannot be empty",
  }),
  q2: z.string().min(1, {
    message: "Question field cannot be empty",
  }),
  q3: z.string().min(1, {
    message: "Question field cannot be empty",
  }),
})



export default function Home({ params }: { params: { name: string } }) {
  const [color, setcolor] = useState('#EBF400')
  const [bgColor, setbgColor] = useState('#151719')
  const [textColor, settextColor] = useState('#FFFFFF')
  const [showColorPicker, setshowColorPicker] = useState(false)
  const [uid, setuid] = useState<string>('');
  const { user } = useUser();
  useEffect(() => {
    if (user) setuid(user.id);
  }, [user]);

  const router = useRouter();
  const [area_info, setArea_info] = useState<area_obj[]>([])
  const [formvis, setFormvis] = useState(false);
  const [Loaded, setLoaded] = useState(false);
  const [updform, setUpdformvis] = useState(false);
  const searchParams = useSearchParams();
  const area_name = searchParams.get('name');
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}${encodeURIComponent(area_name!)}`;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      site_url: "",
      user: "",
      q1: "",
      q2: "",
      q3: ""
    },
  })

  const aux = async () => {
    const stored_area_info = sessionStorage.getItem(`str_info_${area_name}`);
    if (stored_area_info) {
      toast({
        title: 'loaded form info'
      })
      const inst = [await JSON.parse(stored_area_info)];
      setArea_info(inst);
      setLoaded(true);
    }
    else {
      const response = await fetch('../../../api/user_areas_api/peek_area_info', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ site_name: area_name })
      })
      if (response.ok) {
        toast({
          title: 'Form info loaded',
          description: 'It will show in designated area',
        })
        const result = await response.json();
        setArea_info(result.result);
        sessionStorage.setItem(`str_info_${area_name}`, JSON.stringify(result.result[0]));
        setLoaded(true);
      }
      else {
        toast({
          variant: 'destructive',
          title: 'Failed to load area information ',
          description: 'Internal server error'
        });
      }
    }
  }

  const handleClick = (where: number) => {
    if (where == 1) router.push(`../area_page/${params.name}/all_text/?name=${params.name}`);
    else if (where == 2) router.push(`../area_page/${params.name}/liked_text/?name=${params.name}`);
    else router.push(`../area_page/${params.name}/videos`)
  }

  const handleClick2 = (mode: number) => {
    if (mode == 0) setFormvis(!formvis);
    if (formvis == false) aux();
    if (mode == 1) {
      if (updform === false) setFormvis(true);
      else setFormvis(false);
    }
  }

  const handleFormClick = () => {
    handleClick2(1);
    setUpdformvis(!updform);
  }

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    const site_url = values.site_url;
    const user_name = values.user;
    const q1 = values.q1;
    const q2 = values.q2;
    const q3 = values.q3;
    const user_id = uid;
    const old_site_name = area_name;
    const response = await fetch('../../../api/user_areas_api/update', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ site_url, user_name, user_id, q1, q2, q3, old_site_name })
    })
    if (response.ok) {
      toast({
        title: 'Made changes succesfully',
        description: 'page will reload soon'
      })
      setTimeout(() => {
        sessionStorage.removeItem(`str_info_${area_name}`);
        window.location.reload();
      }, 2000);
    }
    else {
      toast({
        variant: 'destructive',
        title: 'Failed to make updates',
        description: 'Please try again'
      })
    }
  }

  return (
    <main className="">
      {uid.length == 0 ? <div className="flex flex-row justify-center">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div> : <div> <h1 className="text-5xl text-center p-6 font-extrabold">
        <span className="text-white">Welcome to your Fast Feedback Area: </span>
        <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">{area_name}</span>
      </h1>
        <h1 className="text-lg text-center p-2 font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">
          <span>Your landing page link : </span>
          <Link href={link}><span className="text-white">{link}</span></Link>
        </h1>
        <div className="flex flex-col justify-between items-center">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black text-lg font-bold transition transform hover:scale-110 duration-300 m-4">Change color of embeds</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center bg-[#151719]">

              <DialogHeader>
                <DialogTitle className="text-white">Please select the color for border of embeds</DialogTitle>
              </DialogHeader>
              <HexColorPicker color={color} onChange={setcolor} />
              <DialogTitle className="text-white">Please select the color for background of card</DialogTitle>
              <HexColorPicker color={bgColor} onChange={setbgColor} />
              <DialogTitle className="text-white">Please select the color for text of card</DialogTitle>
              <HexColorPicker color={textColor} onChange={settextColor} />
            </DialogContent>
          </Dialog>
          <EmbedCard area_name={area_name!} color={color.slice(1)} bgColor={bgColor.slice(1)} textColor={textColor.slice(1)} />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <Button className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black text-lg font-bold transition transform hover:scale-110 duration-300" onClick={() => { handleClick(1) }}>All text feedbacks</Button>
            <Button className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black text-lg font-bold transition transform hover:scale-110 duration-300" onClick={() => { handleClick(2) }}>Embedded text feedbacks</Button>
          </div>
          {/* <div className="grid-cols-1 my-3">
          <Button className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black text-lg font-bold" onClick={() => { handleClick(3) }}>Alll video feedbacks</Button>
        </div> */}
        </div>
        <div className="flex flex-col items-center mt-3 p-5">
          {formvis == false ? <Button onClick={() => { handleClick2(0) }} className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black font-extrabold text-lg transition transform hover:scale-110 duration-300">See your Area information</Button> :
            <Button onClick={() => { handleClick2(0) }} className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black font-extrabold text-lg">Hide your Area information</Button>}
          {formvis == true && Loaded == true ? <div className="flex flex-col justify-normal">
            <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-xl font-extrabold m-7">Your current Fast Feedback Area information will show here</span>
            <div><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-lg font-extrabold">Product Name : </span><span className="text-lg font-extrabold text-white">{area_info[0].site_name}</span></div>
            <div><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-lg font-extrabold">Site URL : </span><span className="text-lg font-extrabold text-white">{area_info[0].site_url}</span></div>
            <div><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-lg font-extrabold">User Name : </span><span className="text-lg font-extrabold text-white">{area_info[0].user_name}</span></div>
            <div><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-lg font-extrabold">User ID : </span><span className="text-lg font-extrabold text-white">{area_info[0].user_id}</span></div>
            <div><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-lg font-extrabold">Q1 : </span><span className="text-lg font-extrabold text-white">{area_info[0].q1}</span></div>
            <div><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-lg font-extrabold">Q2 : </span><span className="text-lg font-extrabold text-white">{area_info[0].q2}</span></div>
            <div><span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent text-lg font-extrabold">Q3 : </span><span className="text-lg font-extrabold text-white">{area_info[0].q3}</span></div>
          </div> : <div></div>}
          <Button onClick={() => { handleFormClick() }} className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] text-black font-extrabold text-lg m-8 transition transform hover:scale-110 duration-300">Edit your Area information</Button>
          {updform == true ? <div className="flex flex-row justify-center max-w-[300px] min-w-[300px] m-7">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="site_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-center font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3">WEBSITE URL</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your website&apos;s URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-center font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3">NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        What&apos;s your name?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="q1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-center font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3">QUESTION 1</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        What  do you want to ask from users?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="q2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-center font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3">QUESTION 2</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        What do you want to ask from users?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="q3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-center font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3">QUESTION 3</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        What do you want to ask from users?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row justify-center">
                  <Button type="submit" className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] p-5 my-8 rounded-2xl min-w-[150px] font-bold text-black transition transform hover:scale-110 duration-300">Update</Button>
                </div>
              </form>
            </Form>
          </div> : <div></div>}
        </div></div>}
    </main>
  );
}