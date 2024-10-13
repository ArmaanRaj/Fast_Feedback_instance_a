//we will code the api here 
//we will first check if site with same name is present previously
//if yes do not insert 
//else add the data into the table

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {user_areas} from "@/app/db/schema/user_areas"
import { db } from "@/app/db/db";

export async function POST(req : NextRequest){
    try{
        const {site_name, site_url , user_name , user_id , q1 , q2, q3} = await req.json(); 
        const result = await db.select().from(user_areas).where(eq(user_areas.site_name , site_name)); 
        if(result.length > 0){
            return NextResponse.json({error:"Try new site name"} ,  {status:400}); 
        }
        else{
            await db.insert(user_areas).values({site_name, site_url , user_name , user_id , q1 , q2, q3}); 
            return NextResponse.json({ error: "Successfull" }, { status: 200 }); 
        }
    }
    catch(error){
        //we will handle error here 
        return NextResponse.json({error:"Internal Server Error"} ,  {status:500}); 
    }
}