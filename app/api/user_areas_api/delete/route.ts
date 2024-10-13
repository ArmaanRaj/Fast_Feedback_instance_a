import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { user_areas } from "@/app/db/schema/user_areas"; 
import { user_reviews } from "@/app/db/schema/user_reviews";
import { db } from "@/app/db/db";

export async function DELETE(req: NextRequest) {
    try {
        const { area_name } = await req.json();
        //first we will delete the reviews
        await db.delete(user_reviews).where(eq(user_reviews.area_name , area_name)); 
        await db.delete(user_areas).where(eq(user_areas.site_name , area_name)); 
        return NextResponse.json({} , {status:200});
    }
    catch (e) {
        return NextResponse.json({} , {status:500}); 
    }
}