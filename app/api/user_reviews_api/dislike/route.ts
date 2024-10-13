import { eq } from "drizzle-orm";
import { user_reviews } from "@/app/db/schema/user_reviews";
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/app/db/db";


export async function PUT(req: NextRequest) {
    try {
        const {email, area_name } = await req.json();
        await db.update(user_reviews).set({ liked:0}).where(eq(user_reviews.user_email_id, email) && eq(user_reviews.area_name, area_name));
        return NextResponse.json({} , {status:200}); 
    }
    catch(e){
        return NextResponse.json({} , {status:500})
    }
}