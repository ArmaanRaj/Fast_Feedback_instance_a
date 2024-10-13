import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { user_reviews } from "@/app/db/schema/user_reviews";
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest) {
    try {
        const { area_name } = await req.json();
        const result = await db.select().from(user_reviews).where(eq(user_reviews.area_name, area_name));
        if(result.length>0){
            return NextResponse.json({result} , {status:200});
        }
        else{
            console.log(result);
            return NextResponse.json({} , {status:400}); 
        }
    } 
    catch(error){
        return NextResponse.json({} , {status:500}); 
    }
}