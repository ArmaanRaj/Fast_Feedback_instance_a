"use client"

import Header from "@/components/Header";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
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
import { useEffect, useState } from "react";
import Lister_Card from "@/components/Lister_Card";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
    site_name: z.string().min(2, {
        //this cannot be duplicated
        message: "Site name must be at least 2 characters.",
    }),
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

interface areas {
    site_name: 'string',
    site_url: 'string',
    user_name: 'string',
    user_id: 'string',
    q1: 'string',
    q2: 'string',
    q3: 'string',
}


export default function Home() {
    const { toast } = useToast();
    const [formVisible, setFormVisible] = useState(false);
    useEffect(() => {
        setFormVisible(false)
    }, [])
    const [areas_array, setareas_array] = useState<areas[]>([])
    const [isLoaded, setisLoaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            site_name: "",
            site_url: "",
            user: "",
            q1: "",
            q2: "",
            q3: ""
        },
    })

    const [uid, setuid] = useState<string>('');
    const { user } = useUser();

    useEffect(() => {
        if (user) setuid(user.id);
    }, [user]);

    useEffect(() => {
        if (uid) {
            load_areas(0);
        }
    }, [uid]);


    useEffect(() => {
        if (areas_array.length > 0) console.log(areas_array);
    }, [areas_array])


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const site_name = values.site_name.trim();
        const site_url = values.site_url;
        const user_name = values.user;
        const q1 = values.q1;
        const q2 = values.q2;
        const q3 = values.q3;
        const user_id = uid;
        setFormVisible(false);
        try {
            const response = await fetch('/api/user_areas_api/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ site_name, site_url, user_name, user_id, q1, q2, q3 }),
            })
            if (response.ok) {
                toast({
                    title: "Submission Accepted",
                    description: "Kindly refer your areas section to see your new Area",
                })
            }
            else throw response;
        }
        catch (error: any) {
            if (error.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Submission not accepted",
                    description: "Try again with new site name",
                })
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Submission not accepted",
                    description: "Internal server error",
                })
            }
        }
        load_areas(1);
    }


    const load_areas = async (mode: number) => {
        const saved_load_areas = sessionStorage.getItem(`saved_areas_${uid}`)
        if (saved_load_areas && mode != 1) {
            setareas_array(JSON.parse(saved_load_areas));
            setisLoaded(true);
        }
        else {
            const user_id = uid;
            const response = await fetch('./api/user_areas_api/peek', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ user_id })
            })
            if (response.ok) {
                const result = await response.json();
                console.log(result.response);
                setareas_array(result.response);
                setisLoaded(true);
                sessionStorage.setItem(`saved_areas_${uid}`, JSON.stringify(result.response));
            }
            else {
                toast({
                    variant: 'destructive',
                    title: 'Internal server error',
                    description: 'Areas cannot be loaded'
                })
            }
        }
    }



    return (
        <main className="text-white">
            {uid.length == 0 ? <div className="flex flex-row justify-center">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div> : <div><Header />
                <h1 className="text-5xl text-center p-6 font-extrabold">
                    <span>Get started </span>
                    by creating your <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Fast Feedback</span> Area
                </h1>
                <div className="flex flex-row justify-center m-8">
                    <div className="min-w-[300px] max-w-[300px]">
                        <div className="flex flex-row justify-center">
                            {formVisible == true ?
                                <Button className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] p-5 my-8 rounded-2xl min-w-[150px] font-bold text-black transition transform hover:scale-110 duration-300" onClick={() => { setFormVisible(false) }}>Hide Form</Button> :
                                <Button className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] p-5 my-8 rounded-2xl font-bold text-black min-w-[400px] transition transform hover:scale-110 duration-300" onClick={() => { setFormVisible(true) }}>Click to add details about your new Fast Feedback area</Button>}
                        </div>
                        <div className="flex flex-row justify-center text-black">
                            {formVisible == true ?
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="site_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className=" text-center font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3">PRODUCT NAME</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Enter your website&apos;s name
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
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
                                                        What do you want to ask from users?
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
                                            <Button type="submit" className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] p-5 my-8 rounded-2xl min-w-[150px] font-bold text-black transition transform hover:scale-110 duration-300">Submit</Button>
                                        </div>
                                    </form>
                                </Form> : <span className="text-xl text-center font-extrabold bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent mx-3">Fill the form to create your own Fast Feedback Area</span>}
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl text-center p-6 font-extrabold">
                    <span>Your </span>
                    <span className="bg-gradient-to-r from-[#EBF400] to-[#FFAF00] bg-clip-text text-transparent">Fast Feedback</span>
                    <span> Areas</span>
                </h2>
                {isLoaded == true ? <div className="flex flex-row justify-center">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 es:grid-cols-1">
                        {areas_array.map((i) => (
                            <Lister_Card name={i.site_name} key={i.site_name} uid={uid}/>
                        ))}
                    </div>
                </div> :
                    <div className="flex flex-row justify-center">
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }</div>}
        </main>
    );
}
