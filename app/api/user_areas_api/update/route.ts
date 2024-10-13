import { NextRequest , NextResponse} from "next/server"; 
import { user_areas } from "@/app/db/schema/user_areas";
import { eq } from "drizzle-orm";
import { db } from "@/app/db/db";

export async function PUT(req:NextRequest){
    try{
        const {site_url , user_name , user_id , q1 , q2, q3 , old_site_name} = await req.json(); 
        console.log(old_site_name);
        const result = await db.update(user_areas).set({site_url:site_url, user_name:user_name , user_id:user_id , q1:q1 , q2:q2 , q3:q3}).where(eq(user_areas.site_name , old_site_name!)).returning(); 
        console.log(result); 
        return NextResponse.json({result} , {status:200}); 
    }
    catch(e){
        return NextResponse.json({} , {status:500}); 
    }   
}